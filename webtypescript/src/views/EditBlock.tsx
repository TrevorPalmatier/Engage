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
  selectBlock,
  cancelBlocks,
  addOldBlock,
} from "../features/blocksSlice";
import {
    addOldSlide,
  addSlide,
  cancelByBlock,
  cancelSlides,
} from "../features/slideSlice";
import {
    addOldMedia,
  cancelBySlide,
  cancelMedia,
  selectMedia,
} from "../features/mediaSlideSlice";
import { Layout } from "../Components/Layout";
import { useEffect } from "react";

/**
 * This will only work to edit a specific block
 * 
 * A block is an object that holds a prompt and multiple slides and assigned to a study.
 *
 * This renders the ability to create a block with a form. It also holds the ability
 * to create multiple sldies for each block.
 * @returns a rendering of a block
 */
const EditBlock = () => {
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
      
    postBlocks(e);
    dispatch(cancelBlocks);
    dispatch(cancelSlides);
    dispatch(cancelMedia);
    navigate(`/viewblock/${params.blockid}`);
  };

  const postBlocks = (e) => {
    e.preventDefault();

      const blockDataPut = {
        id: params.blockid,
        title: block?.title,
        promptTitle: block?.promptTitle,
        promptText: block?.promptText,
        imageID: block?.imageID,
        imgOrientation: block?.imgOrienation,
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
        .then((info) => {postSlides(blockDataPut); deleteSlides(info);})
        .catch((err) => console.log(err));
  };

  /**
   * this method will delete in slide media or slides that were deleted during the edit
   * @param blockInfo 
   */
  const deleteSlides = (blockInfo) => {
    let toDelete = blockInfo.slides;
    slides.forEach((slide) => {
        toDelete = toDelete.filter((slide1) => slide.slideId !== slide1.id)
    })
    console.log(toDelete);

    //delete slide media
    toDelete.forEach((slide) => {
        fetch(`https://ancient-ridge-25388.herokuapp.com/slides/${slide.id}`)
        .then((response) => response.json())
        .then((info) => info.medias.forEach((media1) => {
            deleteMedia(media1.id);
        }));

        const requestOptions = {
            method: "delete",
            headers: { "Content-Type": "application/json" }
          };
        
          fetch(
            `https://ancient-ridge-25388.herokuapp.com/slides/${slide.id}`,
            requestOptions
          )
            .then((response) => response.json())
            .catch((err) => console.log(err));
    })
  }


  /**
   * deletes individual media by id
   * @param id 
   */
  const deleteMedia = (id) => {
    const requestOptions = {
        method: "delete",
        headers: { "Content-Type": "application/json" }
      };

    fetch(
    `https://ancient-ridge-25388.herokuapp.com/slidemedia/${id}`,
    requestOptions
    )
    .then((response) => response.json())
    .catch((err) => console.log(err));

  } 
  
  /**
   * This method is able post the slides for the block to the api
   */
  const postSlides = (blockInfo) => {
    //loops through all the slides and does a post request for each one
    slides.forEach((slide) => {
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
          fetch(
            `https://ancient-ridge-25388.herokuapp.com/slides/${slide_id}`,
            requestOptionsSlide1
          )
            .then((response) => response.json())
            .then((info) => {
              deleteMediaForSlide(info.medias);
              postSlideMedia(slide.id, slideDataPut);

            })
            .catch((err) => console.log(err));
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

          fetch(
            `https://ancient-ridge-25388.herokuapp.com/slides`,
            requestOptionsSlide
          )
            .then((response) => response.json())
            .then((info) => postSlideMedia(slide.id, info))
            .catch((err) => console.log(err));
      }
    );
  };

  const deleteMediaForSlide = (oldSlideMedia) => {
    let toDelete = oldSlideMedia;

    slideMedia?.forEach((media) => {
      toDelete = toDelete.filter((media1) => media.mediaId !== media1.id);
    });

    toDelete.forEach((media) => {
        fetch(`https://ancient-ridge-25388.herokuapp.com/slidemedia/${media.id}`,{
              method: "delete",
              headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.json())
            .catch(error => console.log(error));
    })

  }

  const postSlideMedia = (slideId, slideInfo) => {
    slideMedia?.forEach((media) => {
      if (slideId === media.slideId) {
        if (media.mediaId === -1) {
            const mediaData = {
                imageID: media.imageID,
                type: media.type,
                slide: slideInfo,
                position: media.position,
                orientation: media.orientation,
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
                .catch((err) => console.error(err));
            return;
        } 

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
          .catch((err) => console.error(err));
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
            setBlockImageLink({ id: block?.id, imageID: info.imageID, imgOrientation: findDimensions(info.height, info.width)})
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

    navigate(`../viewblock/${params.blockid}`);
     
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

export default EditBlock;
