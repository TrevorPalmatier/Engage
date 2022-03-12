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
  cancelBlocks,
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!params.studyid) {
      navigate("../createstudy");
      dispatch(enableDisableBlockEdit({ id: block?.id, edit: false }));
      return;
    } else {
      fetch(
        `https://ancient-ridge-25388.herokuapp.com/studies/${params.studyid}`
      )
        .then((res) => res.json())
        .then((data) =>
          postBlocks(e, {
            title: data.title,
            imageID: data.imageID,
            id: data.id,
          })
        );

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

  const postBlocks = (e, studyInfo) => {
    e.preventDefault();
    if (params.blockid != null) {
      const blockDataPut = {
        id: params.blockid,
        title: block?.title,
        promptTitle: block?.promptTitle,
        promptText: block?.promptText,
        imageID: block?.imageID,
      };
      const requestOptionsBlock = {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blockDataPut),
      };

      fetch(
        `https://ancient-ridge-25388.herokuapp.com/blocks/${params.blockid}`,
        requestOptionsBlock
      )
        .then((response) => response.json())
        .then((info) => postSlides(block?.id, blockDataPut))
        .catch((err) => console.log(err));
    } else {
      //block data to be posted
      const blockData = {
        title: block?.title,
        promptTitle: block?.promptTitle,
        promptText: block?.promptText,
        imageID: block?.imageID,
        imgOrientation: block?.imgOrienation,
        study: studyInfo,
      };

      const requestOptionsBlock = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blockData),
      };
      fetch(
        "https://ancient-ridge-25388.herokuapp.com/blocks",
        requestOptionsBlock
      )
        .then((response) => response.json())
        .then((info) => postSlides(block?.id, info))
        .catch((err) => console.log(err));
    }

    dispatch(cancelSlides());
    dispatch(cancelBlocks());
  };

  /**
   * This method is able post the slides for the block to the api
   */
  const postSlides = (blockId, blockInfo) => {
    //loops through all the slides and does a post request for each one
    slides.forEach((slide) => {
      if (slide.blockId === blockId) {
        if (!slide.new) {
          const slideDataPut = {
            id: slide.slideId,
            title: slide.title,
            backgroundText: slide.backgroundText,
          }; //slide data
          const requestOptionsSlide1 = {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slideDataPut),
          };

          const slide_id = slide.slideId;
          console.log("slideid " + slide_id);
          fetch(
            `https://ancient-ridge-25388.herokuapp.com/slides/${slide_id}`,
            requestOptionsSlide1
          )
            .then((response) => response.json())
            .then((info) => {
              postSlideMedia(slide.id, {
                id: slide.slideId,
                title: slide.title,
                backgroundText: slide.backgroundText,
              });
            })
            .catch((err) => console.log(err));
        } else {
          const slideData = {
            title: slide.title,
            backgroundText: slide.backgroundText,
            block: blockInfo,
          }; //slide data
          let requestOptionsSlide = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slideData),
          };

          fetch(
            `https://ancient-ridge-25388.herokuapp.com/slides`,
            requestOptionsSlide
          )
            .then((response) => response.json())
            .then((info) => postSlideMedia(slide.id, info))
            .catch((err) => console.log(err));
        }
      }
    });
  };

  const postSlideMedia = (slideId, slideInfo) => {
    slideMedia?.forEach((media) => {
      if (slideId === media.slideId) {
        if (media.mediaId !== -1) {
          const mediaDataPut = {
            id: media.mediaId,
            imageID: media.imageID,
            type: media.type,
            orientation: media.orientation,
            position: media.position
          };
          const requestOptionsMedia1 = {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mediaDataPut),
          };

          fetch(
            `https://ancient-ridge-25388.herokuapp.com/slidemedia/${media.mediaId}`,
            requestOptionsMedia1
          )
            .then((response) => response.json())
            .catch((err) => console.log(err));
        } else {
          const mediaData = {
            imageID: media.imageID,
            type: media.type,
            slide: slideInfo,
            orientation: media.orientation,
            position: media.position,
          };
          const requestOptionsMedia = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mediaData),
          };

          fetch(
            "https://ancient-ridge-25388.herokuapp.com/slidemedia",
            requestOptionsMedia
          )
            .then((response) => response.json())
            .catch((err) => console.log(err));
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
          const response = await fetch("https://ancient-ridge-25388.herokuapp.com/uploadimage",{
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({file: reader.result}),
          });
          
          const info = await response.json();
          await  dispatch(
            setBlockImageLink({ id: block?.id, imageID: info.publicId, imgOrientation: findDimensions(info.height, info.width)})
          )
        }catch(error){
          console.error(error)
        }
    }
  };

  const findDimensions = (height, width) => {
    if (height > width) {
      return "vertical";
    } else {
      return "landscape";
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
    if (!params.studyid) {
      navigate("../createstudy"); //redirects to "Create Study" page
      return;
    } else {
      if (params.blockid != null) {
        dispatch(cancelSlides());
        dispatch(cancelMedia());
        navigate(`../viewblock/${params.blockid}`);
      } else {
        dispatch(cancelSlides());
        dispatch(cancelMedia());
        navigate(`../viewblocks/${params.studyid}`);
      }
    }
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
