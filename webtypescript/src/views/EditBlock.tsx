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
    }catch(error){
      console.error(error);
    }
    console.log("posted");
    dispatch(cancelBlocks());
    dispatch(cancelSlides());
    dispatch(cancelMedia());
    navigate(`/viewblock/${params.blockid}`);
  };

  const postBlocks = async () => {

      const blockDataPut = {
        id: params.blockid,
        title: block?.title,
        promptTitle: block?.promptTitle,
        promptText: block?.promptText,
        imageID: block?.imageID
      };
      const requestOptionsBlock = {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blockDataPut),
      };
      
      try{
        const response = await fetch(
          `https://ancient-ridge-25388.herokuapp.com/blocks/${params.blockid}`,
          requestOptionsBlock
        )
        
        const info = await response.json();
        await postSlides(info); 
        await deleteSlides(info);

        }catch(error){
          console.log(error);
        } 
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
      try{
        const response = await fetch(`https://ancient-ridge-25388.herokuapp.com/slides/${slide.id}`)
        const info = await response.json();
        await info.medias.forEach(async (media1) => {
            await deleteMedia(media1.id);
        });

        const requestOptions = {
          method: "delete",
          headers: { "Content-Type": "application/json" }
        };
      
         await fetch(
          `https://ancient-ridge-25388.herokuapp.com/slides/${slide.id}`,
          requestOptions
        )
      }catch(error){
        console.error(error);
      }
    })
  }


  /**
   * deletes individual media by id
   * @param id 
   */
  const deleteMedia = async (id) => {
    const requestOptions = {
        method: "delete",
        headers: { "Content-Type": "application/json" }
      };

    try{
      await fetch(
      `https://ancient-ridge-25388.herokuapp.com/slidemedia/${id}`,
      requestOptions
    )
    } catch(err){
      console.log(err);
    }

  } 
  
  /**
   * This method is able post the slides for the block to the api
   */
  const postSlides = async (blockInfo) => {
    //loops through all the slides and does a post request for each one
    await slides.forEach(async (slide) => {
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
              `https://ancient-ridge-25388.herokuapp.com/slides/${slide_id}`,
              requestOptionsSlide1
            )
            const info = await response.json();
            await deleteMediaForSlide(info.medias);
            await postSlideMedia(slide.id, slideDataPut);
            console.log("start1"); 
          }catch(err){
             console.log(err);
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
              `https://ancient-ridge-25388.herokuapp.com/slides`,
              requestOptionsSlide
            )
            const info = await response.json();
            await postSlideMedia(slide.id, info);
            console.log("start2"); 
          }catch(err) {
            console.log(err);
          }
          
      }
    );
  };

  const deleteMediaForSlide = async (oldSlideMedia) => {
    let toDelete = oldSlideMedia;

    slideMedia?.forEach((media) => {
      toDelete = toDelete.filter((media1) => media.mediaId !== media1.id);
    });

    await toDelete.forEach(async (media) => {
      try{
       await fetch(`https://ancient-ridge-25388.herokuapp.com/slidemedia/${media.id}`,{
              method: "delete",
              headers: { 'Content-Type': 'application/json' },
            })
      }catch(error){
        console.error(error);
      } 
    })
  }

  const postSlideMedia = async (slideId, slideInfo) => {
    await slideMedia?.forEach(async (media) => {
      if (slideId === media.slideId) {
        if (media.mediaId === -1) {
            const mediaData = {
                imageID: media.imageID,
                type: media.type,
                slide: slideInfo,
                position: media.position
              };
              const requestOptionsMedia = {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mediaData),
              };
              try{
               await fetch(
                  "https://ancient-ridge-25388.herokuapp.com/slidemedia",
                  requestOptionsMedia
                )
                console.log("start5"); 
              }catch(err) {
                console.error(err)
              }
              
            return;
        } 

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
            `https://ancient-ridge-25388.herokuapp.com/slidemedia/${media.mediaId}`,
            requestOptionsMedia1
          )
          console.log("start4"); 
        }catch(err){
          console.error(err);
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
            setBlockImageLink({ id: block?.id, imageID: info.imageID})
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
