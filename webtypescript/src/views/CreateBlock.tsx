import "../App.scss";
import "../Styling/CreateBlock.scss";
import CreateSlide from "./CreateSlide";
import { Image } from "cloudinary-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import {
  setBlockTitle,
  setBlockImageLink,
  setBlockPromptText,
  setBlockPromptTitle,
  cancelled,
  enableDisableBlockEdit,
  selectBlock,
  cancelBlocks
} from "../features/blocksSlice";
import {
  addSlide,
  cancelByBlock,
  cancelSlides,
} from "../features/slideSlice";
import {
  cancelBySlide,
  cancelMedia,
  selectMedia,
} from "../features/mediaSlideSlice";
import { Layout } from "../Components/Layout";
import { responseInterceptor } from "http-proxy-middleware";

/**
 * A block is an object that holds a prompt and multiple slides and assigned to a study.
 *
 * This renders the ability to create a block with a form. It also holds the ability
 * to create multiple sldies for each block.
 * @returns a rendering of a block
 */
const CreateBlock = () => {
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
    e.preventDefault();

    if (!params.studyid) {
      navigate("../createstudy");
      dispatch(enableDisableBlockEdit({ id: block?.id, edit: false }));
      return;
    } else {
      try{
        const response = await fetch(
          `/studies/${params.studyid}`
        )
        const data = await response.json();
        
        await postBlocks({
          title: data.title,
          imageID: data.imageID,
          id: data.id,
        })
      }catch(error){
        console.error(error);
      }

      dispatch(cancelMedia());
      dispatch(cancelBlocks());
      dispatch(cancelSlides());
      if (params.blockid == null) {
        navigate(`../viewblocks/${params.studyid}`); //go back to viewing blocks
      } else {
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

      const requestOptionsBlock = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blockData),
      };

      try{
        const response = await fetch(
          "/blocks",
          requestOptionsBlock
        )
        const info = await response.json();
        await postSlides(block?.id, info);
      }catch(err) {
        console.log(err);
      } 
  };

  /**
   * This method is able post the slides for the block to the api
   */
  const postSlides = async (blockId, blockInfo) => {
    //loops through all the slides and does a post request for each one
    await slides.forEach(async (slide) => {
      if (slide.blockId === blockId) {
        if (!slide.new) {
          const slideDataPut = {
            id: slide.slideId,
            title: slide.title,
            backgroundText: slide.backgroundText,
            option: slide.option
          }; //slide data
          const requestOptionsSlide1 = {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slideDataPut),
          };

          const slide_id = slide.slideId;
          
          try{
            const response = await fetch(
              `/slides/${slide_id}`,
              requestOptionsSlide1
            )
            const info = await response.json();
             await postSlideMedia(slide.id, slideDataPut);

            }catch(error){
              console.error(error);
            }
            return;
        }
          const slideData = {
            title: slide.title,
            backgroundText: slide.backgroundText,
            block: blockInfo,
            option: slide.option,
          }; //slide data
          let requestOptionsSlide = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slideData),
          };
          try{
            const response = await fetch(
              `/slides`,
              requestOptionsSlide
            )
            const info = await response.json();
            await postSlideMedia(slide.id, info);

          }catch(error) {
            console.error(error);
          }
        }
    });
  };

  const postSlideMedia = async (slideId, slideInfo) => {
    await slideMedia?.forEach(async (media) => {
      if (slideId === media.slideId) {
        if (media.mediaId !== -1) {
          const mediaDataPut = {
            id: media.mediaId,
            imageID: media.imageID,
            type: media.type,
            position: media.position
          };
          const requestOptionsMedia1 = {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mediaDataPut),
          };

          try{
          await fetch(
            `/slidemedia/${media.mediaId}`,
            requestOptionsMedia1
          )
          }catch(error){
            console.error(error);
          }
          return;
        } 
          const mediaData = {
            imageID: media.imageID,
            type: media.type,
            slide: slideInfo,
            position: media.position,
          };
          const requestOptionsMedia = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mediaData),
          };

          try{
            await fetch(
              "/slidemedia",
              requestOptionsMedia
            )
          }catch(err) {
            console.log(err);
          }
        }
    });
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
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = async() => {
        try{
          const response = await fetch("/uploadimage",{
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({file: reader.result}),
          });
          
          const info = await response.json();
          await  dispatch(
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
  const handleCancel = () => {
    dispatch(cancelled({ id: block?.id }));
    slides.forEach((slide) => {
      dispatch(cancelBySlide({ slideId: slide.id }));
    });
    dispatch(cancelByBlock({ blockId: block?.id }));

    //cancel the block and any slide
    if (params.studyid) {
      navigate(`../viewblocks/${params.studyid}`);
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
          <div className="submitButtons">
            <button className="buttonText" type="submit">
              Save
            </button>
            <button className="buttonText" onClick={handleCancel}>
              Delete & Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateBlock;
