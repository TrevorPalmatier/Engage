import "../../App.scss";
import "./CreateBlock.scss";
import CreateSlide from "../CreateSlide/CreateSlide";
import { Image } from "cloudinary-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
  setBlockTitle,
  setBlockImageLink,
  setBlockPromptText,
  setBlockPromptTitle,
  cancelled,
  enableDisableBlockEdit,
  selectBlock,
  cancelBlocks
} from "../../features/blocksSlice";
import {
  addSlide,
  cancelByBlock,
  cancelSlides,
} from "../../features/slideSlice";
import {
  cancelBySlide,
  cancelMedia,
  selectMedia,
} from "../../features/mediaSlideSlice";
import { Layout } from "../../Components/Layout";
import * as CreateBlockAPI from "./CreateBlockAPI";
import * as CloudinaryAPI from "../../SharedAPI/CloudinaryAPI";
import { useEffect, useState } from "react";
import { isConditionalExpression } from "typescript";

/**
 * A block is an object that holds a prompt and multiple slides and assigned to a study.
 *
 * This renders the ability to create a block with a form. It also holds the ability
 * to create multiple sldies for each block.
 * @returns a rendering of a block
 */
const CreateBlock = () => {
  const [errorMsg, setError] = useState("");
  //set up redux for the block and slides
  const dispatch = useAppDispatch(); //calls on reducers actions
  const block = useAppSelector(selectBlock); //selects data to be persisted from a block
  const slides = useAppSelector((state) =>
    state.persistedReducer.slides.filter((slide) => slide.blockId === block?.id)
  ); //selects slides for a specific block
  const slideMedia = [...useAppSelector(selectMedia)];

  //allows navigation
  const navigate = useNavigate();
  const params = useParams();
  /**
   * Method is called when the user pushes the "Create" button
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    

    if (!params.studyid) {
      navigate("../createstudy");
      dispatch(enableDisableBlockEdit({ id: block?.id, edit: false }));
      return;
    } else {
      const data = await CreateBlockAPI.getStudyInfo(params.studyid);
      
      await postBlocks({
        title: data.title,
        imageID: data.imageID,
        id: data.id,
      });

      if(errorMsg === ""){
        dispatch(cancelMedia());
        dispatch(cancelBlocks());
        dispatch(cancelSlides());
        if (params.blockid == null) {
          navigate(`../viewstudy/${params.studyid}`); //go back to viewing blocks
          return;
        }
        navigate(`/viewblock/${params.blockid}`);
      }
    }
  };

  const postBlocks = async (studyInfo) => {
      //block data to be posted
      const blockData = {
        title: block?.title,
        promptTitle: block?.promptTitle,
        promptText: block?.promptText,
        imageID: block?.imageID,
        study: studyInfo,
      };

        try{
          const res = await CreateBlockAPI.postBlock(blockData);
          setError("");
          await postSlides(block?.id, res);
        }catch(error: any){
          console.log(error.message);
          await setError(error.message);
          console.log(errorMsg);
        }
  };

  /**
   * This method is able post the slides for the block to the api
   */
  const postSlides = async (blockId, blockInfo) => {
    //loops through all the slides and does a post request for each one
    await Promise.all(slides.map(async (slide) => {
        const slideData = {
          title: slide.title,
          backgroundText: slide.backgroundText,
          block: blockInfo,
          option: slide.option,
        }; //slide data
        
        const info = await CreateBlockAPI.postSlide(slideData);
        await postSlideMedia(slide.id, info);
    }));
  };

  const postSlideMedia = async (slideId, slideInfo) => {
    await Promise.all(slideMedia?.map(async (media) => {
      if (slideId === media.slideId) {
          const mediaData = {
            imageID: media.imageID,
            type: media.type,
            slide: slideInfo,
            position: media.position,
          };
          
          await CreateBlockAPI.postSlideMedia(mediaData);
        }
    }));
  };

  /**
   * This method selects the image for the cover of the block
   *
   * For now once the image is choose it will upload to the file system: cloudinary
   */
  const selectImage = (event: any) => {
    event.preventDefault();
    let img = event.target.files?.[0];
    if (!img) {
      console.log("not uploaded");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = async() => {
        try{
          const info = await CloudinaryAPI.uploadSingleImage( reader );
          if(block?.imageID !== ""){
            await CloudinaryAPI.destroyImage(block?.imageID);
          }
          dispatch(
            setBlockImageLink({ id: block?.id, imageID: info.publicId})
          )
        }catch(error){
          console.error(error)
        }
    }
  };

  //creates new slide element and adds it through the reducer
  const handleNewSlide = () => {
    dispatch(addSlide({ blockId: block?.id }));
  };

  //handles discarding the block and slides when cancelled
  const handleCancel = async (e) => {
    e.preventDefault();

    if(block?.imageID !== ""){
      await CloudinaryAPI.destroyImage( block?.imageID);
    }

    dispatch(cancelled({ id: block?.id }));

    await Promise.all(slideMedia?.map(async (media) => {
        await CloudinaryAPI.destroyImage(media.imageID);
    }));

    slides.forEach((slide) => {
      dispatch(cancelBySlide({ slideId: slide.id }));
    });
    dispatch(cancelByBlock({ blockId: block?.id }));

    //cancel the block and any slide
    if (params.studyid) {
      navigate(`../viewstudy/${params.studyid}`);
      return;
    }

    navigate("../createstudy"); //redirects to "Create Study" page
  };

  //renders the element
  //inserted defaultVlaue to use persist data even if page is refreshed
  return (
    <Layout>
      <div className="viewHeader">
        <h1>Create a Block</h1>
      </div>
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <fieldset>
            <label>Name of Block:</label>
            <input
              type="text"
              defaultValue={block?.title}
              name="name_of_block"
              onChange={(e) => {
                dispatch(
                  setBlockTitle({ id: block?.id, title: e.target.value })
                );
              }}
            />
          </fieldset>
          <fieldset>
            <label> Upload Front Cover for Block:</label>
            <input type="file" name="image" onChange={selectImage} />
          </fieldset>
          {block?.selectedImage && (
            <Image className="photo" cloudName='engageapp' publicId={block?.imageID}/>
          )}
          <div className="createRect">
            <h2>Create Prompt</h2>
            <fieldset>
              <label>Title of Prompt:</label>
              <input
                type="text"
                defaultValue={block?.promptTitle}
                name="title_of_prompt"
                onChange={(e) => {
                  dispatch(
                    setBlockPromptTitle({
                      id: block?.id,
                      promptTitle: e.target.value,
                    })
                  );
                }}
              />
            </fieldset>
            <fieldset>
              <label>
                Prompt: <br />
              </label>
              <textarea
                className="textArea"
                defaultValue={block?.promptText}
                name="prompt"
                onChange={(e) => {
                  dispatch(
                    setBlockPromptText({
                      id: block?.id,
                      promptText: e.target.value,
                    })
                  );
                }}
              />
            </fieldset>
          </div>
          {slides.map((slide) => {
            return (
              <div key={slide.id} className="createRect">
                <CreateSlide key={slide.id} id={slide.id} />
              </div>
            );
          })}
          <button
            type="button"
            className="fullWidthButton"
            onClick={handleNewSlide}
          >
            + Create New Slide
          </button>
          {errorMsg !== "" &&
            <p>{errorMsg}</p>

          }
          <div className="submitButtons">
            <button className="buttonText" type="submit">
              Save
            </button>
            <button className="buttonText" onClick={(e) => {
              const confirmBox = window.confirm("Are you sure you want to delete this Block? \n Click \"Save\" to save any changes.")
              if(confirmBox === true){
                handleCancel(e);
              }}}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateBlock;
