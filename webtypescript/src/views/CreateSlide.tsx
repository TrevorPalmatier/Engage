import React from "react";
import '../App.css';
import '../Styling/CreateSlide.css';
import { useNavigate } from "react-router-dom";
import { setText, setTitle, cancel, addSlide } from "../features/slideSlice";
import { addMedia,deleteOneMedia } from "../features/mediaSlideState";
import { useAppSelector, useAppDispatch } from "../hooks/store";

/**
 * This renders an element that allows a slide for a block to be created
 * 
 * It uses the slideSlice to persist data when page is refreshed or new slides are added
 */
const CreateSlide = ({id}) => {

    //set up reducers and redux
    const slide = useAppSelector(state => state.persistedReducer.slides).find(slide => slide.id === id);
    const dispatch = useAppDispatch();
    const media = useAppSelector(state => state.persistedReducer.media).filter(media => media.slideId === slide?.id)
    
    const selectMedia = (event) => {
        const files = event.target.files;
        console.log(files);

        [...files].forEach((file) => {
            let img = file;

            const data = new FormData();

            data.append("file", img);
            data.append("upload_preset", "engageapp");
            data.append("cloud_name", "engageapp");

            const uploadImage = fetch("https://api.cloudinary.com/v1_1/engageapp/upload", {
                method: "POST",
                body: data,
            })
                .then(response => response.json())
                .then(info => dispatch(addMedia({slideId: slide?.id, type: file.type, url: info.secure_url})))
        })
    }
    
    const deleteMedia = (mediaid) => {
        dispatch(deleteOneMedia({id: mediaid}));
    }

    //renders the create study element
    //still needs to handle multiple image upload
    return (
        <div className="wrapper">
            <fieldset>
                <label> Title of Slide:</label> 
                    <input type="text" defaultValue={slide?.title} name="slide_title" 
                        onChange={e=>{ dispatch(setTitle({id: slide?.id, title: e.target.value}))}} />
                
            </fieldset>
            <fieldset>
                <label>Background Text:  </label>
                <textarea className='textArea' defaultValue={slide?.backgroundText} name="prompt" 
                        onChange={e=>{dispatch(setText({id: slide?.id, text: e.target.value}))}}/>
               
            </fieldset>
            <fieldset>
                <label>Upload images to display on the slide: </label>
                <input type="file"onChange={event => selectMedia(event)} multiple />     
            </fieldset>
            <div className="slideMedia">
                
            {media?.map((media1)=> {
                return (
                    <div key= {media1.id}>
                        { media1.type.split('/')[0] == 'video' && 
                                <video className="mediahover"  onClick={() => deleteMedia(media1.id)} src={media1.url}/>
                        }
                        {media1.type.split('/')[0] == 'image' && 
                                <img className="mediahover" onClick={() => deleteMedia(media1.id)}src={media1.url}/>
                        }
                    <p className="texthover">Click to Delete</p>
                    </div>
                )
                })}
            </div>
        </div>
    )
};
export default CreateSlide;