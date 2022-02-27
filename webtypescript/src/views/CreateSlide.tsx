import React from "react";
import '../App.scss';
import { useNavigate } from "react-router-dom";
import { setText, setTitle, cancel, addSlide } from "../features/slideSlice";
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
    
    //renders the create study element
    //still needs to handle multiple image upload
    return (
        <div className="wrapper">
            <fieldset>
                <label>
                    Title of Slide: 
                    <input type="text" defaultValue={slide?.title} name="slide_title" 
                        onChange={e=>{ dispatch(setTitle({id: slide?.id, title: e.target.value}))}} />
                </label>
            </fieldset>
            <fieldset>
                <label>
                    Background Text: 
                    <br/>
                    <textarea cols={150} defaultValue={slide?.backgroundText} name="prompt" 
                        onChange={e=>{dispatch(setText({id: slide?.id, text: e.target.value}))}}/>
                </label>
            </fieldset>
            <fieldset>
                <label>
                    Upload images to display on the slide: 
                    <input type="file"  multiple />
                </label>
            </fieldset>
        </div>
    )
};
export default CreateSlide;