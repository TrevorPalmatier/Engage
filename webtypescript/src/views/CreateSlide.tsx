import React from "react";
import "../App.scss";
import "../Styling/CreateSlide.scss";
import { Image } from "cloudinary-react";
import {
  setText,
  setTitle,
  setSlideOption,
  cancel,
} from "../features/slideSlice";
import { addMedia, cancelBySlide, deleteOneMedia, setMediaPosition } from "../features/mediaSlideSlice";
import { useAppSelector, useAppDispatch } from "../hooks/store";

/**
 * This renders an element that allows a slide for a block to be created
 *
 * It uses the slideSlice to persist data when page is refreshed or new slides are added
 */
const CreateSlide = ({ id }) => {
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
          try{
            const response = await fetch("https://ancient-ridge-25388.herokuapp.com/uploadimage",{
              method: "post",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({file: reader.result}),
            });
            const info = await response.json();
            await dispatch(
              addMedia({
                slideId: slide?.id,
                type: file.type,
                imageID: info.publicId,
              })
            )
          }catch(error){
            console.error(error)
          }
        }
        }
    });
  };

  const deleteMedia = (mediaid) => {
    dispatch(deleteOneMedia({ id: mediaid }));
    
  };

  const getId = (url) => {
    const regExp = "/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/";
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}
    
const videoId = getId('http://www.youtube.com/watch?v=zbYf5_S7oJo');

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
        <input type="text" name="video"/>
        <p>Example: </p> 
        <img src="youtubeex.jpg"/>
      </fieldset>
      <div className="slideMedia">
        {media?.map((media1, index) => {
          return (
            <div key={media1.id}>
              <p className="texthover">Click to Delete</p>
              {media1.type.split("/")[0] === "video" && (
                <video
                  className="mediahover"
                  onClick={() => deleteMedia(media1.id)}
                  src={media1.imageID}
                />
              )}
              {media1.type.split("/")[0] === "image" && (
                <Image className="mediahover" onClick={() => deleteMedia(media1.id)} cloudName='engageapp' publicId={media1.imageID}/>
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
        <button type="button" className="buttonText" onClick={() => {dispatch(cancel({id:slide?.id})); dispatch(cancelBySlide({slideId:slide?.id}))}}>Delete Slide</button>
      </div>
    </div>
  );
};
export default CreateSlide;
