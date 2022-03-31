import "../../App.scss";
import "../CreateBlock/CreateBlock.scss";
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
  selectBlock,
  cancelBlocks,
  addOldBlock,
} from "../../features/blocksSlice";
import {
    addOldSlide,
  addSlide,
  cancelByBlock,
  cancelSlides,
} from "../../features/slideSlice";
import {
    addOldMedia,
  cancelBySlide,
  cancelMedia,
  selectMedia,
} from "../../features/mediaSlideSlice";
import { Layout } from "../../Components/Layout";
import * as CloudinaryAPI from "../../SharedAPI/CloudinaryAPI";
import * as EditBlockAPI from "./EditBlockAPI";

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try{
      await postBlocks();
      console.log("posted");
    dispatch(cancelBlocks());
    dispatch(cancelSlides());
    dispatch(cancelMedia());
    navigate(`/viewblock/${params.blockid}`);
    }catch(error){
      console.error(error);
    }
    
  };

  const postBlocks = async () => {

      const blockData = {
        title: block?.title,
        promptTitle: block?.promptTitle,
        promptText: block?.promptText,
        imageID: block?.imageID
      };
        
        const info = await EditBlockAPI.updateBlock(params.blockid, blockData);

        console.log(info);
        await postSlides(info); 
        await deleteSlides(info);

        console.log("start");      
  };

  /**
   * this method will delete in slide media or slides that were deleted during the edit
   * @param blockInfo 
   */
  const deleteSlides = async (blockInfo) => {
    let toDelete = blockInfo.slides;
    slides.forEach((slide) => {
        toDelete = toDelete.filter((slide1) => slide.slideId !== slide1.id)
    })

    //delete slide media
    await toDelete.forEach(async (slide) => {
      await EditBlockAPI.deleteSlide(slide.id);
    })
  }
  
  /**
   * This method is able post the slides for the block to the api
   */
  const postSlides = async (blockInfo) => {
    //loops through all the slides and does a post request for each one
    await slides.forEach(async (slide) => {
        if (!slide.new) {
          const slideData = {
            title: slide.title,
            backgroundText: slide.backgroundText,
            option: slide.option
          }; //slide data
         
            const info = await EditBlockAPI.updateSlide(slide.slideId, slideData);
            await deleteMediaForSlide(info.medias);
            await postSlideMedia(info);
            console.log("start1"); 
          
        return;
        } 
          const slideData = {
            title: slide.title,
            backgroundText: slide.backgroundText,
            block: blockInfo,
            option: slide.option,
          }; //slide data
          
            const info = await EditBlockAPI.postSlide(slideData);
            await postSlideMedia(info);
            console.log("start2"); 
          
          
      }
    );
  };

  const deleteMediaForSlide = async (oldSlideMedia) => {
    let toDelete = oldSlideMedia;

    slideMedia?.forEach((media) => {
      toDelete = toDelete.filter((media1) => media.mediaId !== media1.id);
    });

    await toDelete.forEach(async (media) => {
      await EditBlockAPI.deleteMedia(media);
    })
  }

  const postSlideMedia = async ( slideInfo) => {
    slideMedia?.forEach(async (media) => {
      if (slideInfo.id === media.slideId) {
        if (media.mediaId === -1) {
            const mediaData = {
                imageID: media.imageID,
                type: media.type,
                slide: slideInfo,
                position: media.position
              };
            await EditBlockAPI.postSlideMedia(mediaData);   
            return;
        } 

        const mediaData = {
          imageID: media.imageID,
          type: media.type,
          position: media.position
        };

        await EditBlockAPI.updateSlideMedia(media.mediaId, mediaData);
          console.log("start4");     
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
          const erase = block?.imageID;

          const info = await CloudinaryAPI.uploadSingleImage(reader); 
          dispatch(
            setBlockImageLink({ id: block?.id, imageID: info.publicId})
          )

          if(erase !== block?.originalImage){
            await CloudinaryAPI.destroyImage(erase);
          }
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

    if(block?.imageID !== block?.originalImage){
      await CloudinaryAPI.destroyImage(block?.imageID);
    }
    
    slideMedia?.forEach(async (media) => {
      if(!media.original){
        await CloudinaryAPI.destroyImage(media.imageID);
      }
    })
    
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
            <input type="file" name="image" onChange={(e) => selectImage(e)} />
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
            <button className="buttonText" onClick={(e) => handleCancel(e)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditBlock;
