import React, { useState } from "react";
import "../../App.scss";
import "./CreateSlide.scss";
import { Image } from "cloudinary-react";
import example from "./youtubeex.jpg";
import {
  setText,
  setTitle,
  setSlideOption,
  cancel,
} from "../../features/slideSlice";
import { addMedia, cancelBySlide, deleteOneMedia, setMediaPosition } from "../../features/mediaSlideSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/store";
import * as CloudinaryAPI from "../../SharedAPI/CloudinaryAPI";

/**
 * This renders an element that allows a slide for a block to be created
 *
 * It uses the slideSlice to persist data when page is refreshed or new slides are added
 */
const CreateSlide = ({ id }) => {
  const [embedCode, setVideo] = useState("");
  const [position, setPosition] = useState(1);
  //set up reducers and redux
  const slide = useAppSelector((state) => state.persistedReducer.slides).find(
    (slide) => slide.id === id
  );
  const dispatch = useAppDispatch();
  const media = useAppSelector((state) => state.persistedReducer.media).filter(
    (media) => media.slideId === slide?.id
  );

  const selectMedia = (event) => {
    const files = event.target.files;
    

    [...files].forEach((file, index) => {
      if (index > 1) {
        alert("You can only upload a maximum of 2 files");
        return;
      } else {
        let img = file;
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = async() => {
          
            const info = await CloudinaryAPI.uploadSingleImage(reader);
            dispatch(
              addMedia({
                slideId: slide?.id,
                type: "image",
                imageID: info.publicId,
                position: position
              })
            )
            setPosition(position+1);
        }
        }
    });
  };

  const deleteMedia = async (media) => {
    if(!media.original && media.type === "image"){
      await CloudinaryAPI.destroyImage(media.imageID);
    }
    dispatch(deleteOneMedia({ id: media.id }));
    console.log("deleted");
  };

    
const uploadVideo = () => {
  dispatch(addMedia({slideId: slide?.id, type: "video", imageID: embedCode, position: position}));
  setPosition(position+1);
}

const deleteSlide = async (e) => {
  e.preventDefault();

  media?.forEach(async (med) => {
    await CloudinaryAPI.destroyImage(med.imageID)
  })
  
  dispatch(cancel({id:slide?.id}));
  dispatch(cancelBySlide({slideId:slide?.id}));
}

  //renders the create study element
  //still needs to handle multiple image upload
  return (
    <div className="form">
      <fieldset>
        <label> Title of Slide:</label>
        <input
          type="text"
          defaultValue={slide?.title}
          name="slide_title"
          onChange={(e) => {
            dispatch(setTitle({ id: slide?.id, title: e.target.value }));
          }}
        />
      </fieldset>
      <fieldset>
        <label>Background Text: </label>
        <textarea
          className="textArea"
          defaultValue={slide?.backgroundText}
          name="prompt"
          onChange={(e) => {
            dispatch(setText({ id: slide?.id, text: e.target.value }));
          }}
        />
      </fieldset>
      <label>Upload 1-2 images/videos to display on the slide: </label>
      <fieldset>
        <input type="file" onChange={(event) => selectMedia(event)} multiple />
      </fieldset>
      <fieldset>
        <label>Upload Youtube Videos by inserting Embed Code here: </label>
        
        <input type="text" name="video" onChange={(e) => setVideo(e.target.value)}/>
        <button type="button" className="buttonText" onClick={(e) => uploadVideo()}>Upload Video</button>
      </fieldset>
      <div className="flex">
        <p>Example: </p> 
        <img src={example}/>
      </div>
      <div className="slideMedia">
        {media?.map((media1, index) => {
          return (
            <div key={media1.id} >
              <button type="button" className="texthover" onClick={() => deleteMedia(media1)}>Delete Image/Video</button>
              {media1.type === "video" && (
                <iframe width="200px" height="auto" 
                  src={`https://www.youtube.com/embed/${media1.imageID}`}
                />
              )}
              {media1.type === "image" && (
                <Image className="mediahover" cloudName='engageapp' publicId={media1.imageID}/>
              )}
              
              {
                media.length === 2 &&
                <div className="submitButtons">
                  <label>
                    <span>Position {index+1}</span>
                  </label>
                </div>
              }
            </div>
          );
        })}
      </div>
      <div className="submitButtons">
        <label>
          <input
            type="radio"
            onClick={() => dispatch(setSlideOption({ id: slide?.id, option: 1 }))}
            name="selectOption"
          />
          <span>Select Option 1</span>
        </label>
        <label>
          <input type="radio"
          onClick={() => dispatch(setSlideOption({ id: slide?.id, option: 2 }))}
          name="selectOption"
        />
          <span>Select Option 2</span>
        </label>
        <label className='radio'>
          <input
          type="radio"
          onClick={() => dispatch(setSlideOption({ id: slide?.id, option: 3 }))}
          name="selectOption"
          />
          <span>Select Option 3</span>
        </label>
        
      </div>
      <div>
        <button type="button" className="buttonText" onClick={ (e) => {deleteSlide(e)}}>Delete Slide</button>
      </div>
    </div>
  );
};
export default CreateSlide;
