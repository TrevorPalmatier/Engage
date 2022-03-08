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
import { addMedia, cancelBySlide, deleteOneMedia } from "../features/mediaSlideSlice";
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
              orientation: findDimensions(info.height, info.width),
              position: media.length,
              url: info.publicId,
            })
          )
        }catch(error){
          console.error(error)
        }
    }}
    });
  };

  const deleteMedia = (mediaid, idOfMedia) => {
    dispatch(deleteOneMedia({ id: mediaid }));

    if(idOfMedia !== -1){
      fetch(`https://ancient-ridge-25388.herokuapp.com/slidemedia/${idOfMedia}`,{
            method: "delete",
            headers: { 'Content-Type': 'application/json' },
          })
          .then(response => response.json())
          .catch(error => console.log(error));
    }
    
  };

  const findDimensions = (height, width) => {
    if (height > width) {
      return "vertical";
    } else {
      return "landscape";
    }
  };

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
      <fieldset>
        <label>Upload 1-2 images to display on the slide: </label>
        <input type="file" onChange={(event) => selectMedia(event)} multiple />
      </fieldset>
      <div className="slideMedia">
        {media?.map((media1) => {
          return (
            <div key={media1.id}>
              {media1.type.split("/")[0] === "video" && (
                <video
                  className="mediahover"
                  onClick={() => deleteMedia(media1.id, media1.mediaId)}
                  src={media1.url}
                />
              )}
              {media1.type.split("/")[0] === "image" && (
                <Image className="mediahover" onClick={() => deleteMedia(media1.id, media1.mediaId)} cloudName='engageapp' publicId={media1.url}/>
              )}
              <p className="texthover">Click to Delete</p>
            </div>
          );
        })}
      </div>
      <div className="submitButtons">
        <button
          type="button"
          className="buttonText"
          onClick={() => dispatch(setSlideOption({ id: slide?.id, option: 1 }))}
        >
          Select Option 1
        </button>
        <button
        type="button"
          className="buttonText"
          onClick={() => dispatch(setSlideOption({ id: slide?.id, option: 2 }))}
        >
          Select Option 2
        </button>
        <button
          type="button"
          className="buttonText"
          onClick={() => dispatch(setSlideOption({ id: slide?.id, option: 3 }))}
        >
          Select Option 3
        </button>
      </div>
      <div>
        <button type="button" className="buttonText" onClick={() => {dispatch(cancel({id:slide?.id})); dispatch(cancelBySlide({slideId:slide?.id}))}}>Delete Slide</button>
      </div>
    </div>
  );
};
export default CreateSlide;
