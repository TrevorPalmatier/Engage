import React, {useState} from "react";
import '../App.css';
import NavbarScroller from "../Components/NavbarScroller";
import CreateSlide from "./CreateSlide";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { setBlockTitle, setBlockImageLink, setBlockPromptText, setBlockPromptTitle, 
    cancelled, enableDisableBlockEdit, selectBlock } from "../features/blocksSlice";
import { addSlide, cancel} from "../features/slideSlice";

/**
 * A block is an object that holds a prompt and multiple slides and assigned to a study.
 * 
 * This renders the ability to create a block with a form. It also holds the ability 
 * to create multiple sldies for each block. 
 * @returns a rendering of a block 
 */
const CreateBlock = () => {
     //set up redux for the block and slides
    const dispatch = useAppDispatch();      //calls on reducers actions
    const block  = useAppSelector(selectBlock);     //selects data to be persisted from a block
    const slides = useAppSelector(state => state.persistedReducer.slides.filter(slide => slide.blockId == block?.id));      //selects slides for a specific block

    //allows navigation
    const navigate = useNavigate();


    /**
     * Method is called when the user pushes the "Create" button 
     */
    const handleSubmit =  (e) => {
        navigate("../createstudy");
    };

   /**
     * This method selects the image for the cover of the block
     * 
     * For now once the image is choose it will upload to the file system: cloudinary
     */
    const selectImage = (event: any) => {
        
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];

            //creates the data for the post to cloudinary
            const data = new FormData();
            data.append("file", img);
            data.append("upload_preset", "engageapp");
            data.append("cloud_name", "engageapp");

            //posts to cloudinary here
            fetch("https://api.cloudinary.com/v1_1/engageapp/upload", {
                method: "POST",
                body: data,
            })
            .then(response => response.json())
            .then(info => dispatch(setBlockImageLink({id: block?.id, imageLink: info.secure_url})));

        }
    };

    //creates new slide element and adds it through the reducer
    const handleNewSlide = () => {
        dispatch(addSlide({blockId: block?.id}));
        //dispatch(addSlide({slide: slides}))
    };

    //handles discarding the block and slides when cancelled
    const handleCancel = () => {
        //cancel the block and any slide
        dispatch(cancelled({id: block?.id}))
        slides.map((slide) => {
            dispatch(cancel({id: slide.id}))
        })
        navigate("../createstudy");     //redirects to "Create Study" page
    }

    //renders the element
    //inserted defaultVlaue to use persist data even if page is refreshed 
    return (
        <div>
            <NavbarScroller/>
            <div className = "viewHeader">
                <h1>Create a Block</h1>
            </div>
            <div className = "wrapper">
               <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        Name of Block:  
                        <input type="text" defaultValue={block?.title} name="name_of_block"
                            onChange={e=>{dispatch(setBlockTitle({id: block?.id, title: e.target.value}))}} />
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        Upload Front Cover for Block: 
                        <input type="file" name="image" onChange={selectImage} />
                    </label>
                </fieldset>
                    {block?.selectedImage && 
                        <img className="photo"  src={block?.imageLink} />
                    }
                <br/>
                <div className="createRect">
                    <h2>Create Prompt</h2>
                    <fieldset>
                        <label>
                            Title of Prompt: 
                            <input type="text" defaultValue={block?.promptTitle} name="title_of_prompt" 
                                onChange={e=>{dispatch(setBlockPromptTitle({id: block?.id, promptTitle: e.target.value}))}}/>
                        </label>
                    </fieldset>
                    <fieldset>
                        <label>
                            Prompt: 
                            <br/>
                            <textarea cols={150} defaultValue={block?.promptText} name="prompt" 
                                onChange={e=>{dispatch(setBlockPromptText({id: block?.id, promptText: e.target.value}))}}/>
                        </label>
                    </fieldset>
                </div>
                <br/>
                    {
                    slides.map((slide) => {
                        return (
                        <div key={slide.id} className="createRect">
                            <CreateSlide key={slide.id} id={slide.id}/>
                        </div>
                        )
                    })
                    }
                <div>
                    <button type="button" onClick={handleNewSlide}>+ Create New Slide</button>
                </div>
                <br/>
                <div>
                    <button type="submit">Create</button>
                    <button className ="center"onClick={handleCancel}>Cancel</button>
                </div>
               </form>
            </div>
        </div>
    )
}

export default CreateBlock;