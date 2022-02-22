import React, {useState} from "react";
import '../App.css';
import NavbarScroller from "../Components/NavbarScroller";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { setTitle, setImage, cancelled, selectStudy} from "../features/studySlice";
import { addBlock } from "../features/blocksSlice";
import { RootState } from "../store";

/** 
 * Notes for things to maybe implement:
    *   create blocks similar to slides?
    *   have to store the blocks to display?
    *   post all blocks with study cause the studyId isn't created yet?
*/


/**
 * This class renders the a form to Create a study 
 * @returns form to Create a Study
 */
const CreateStudy = () => {
    //sets up reducers and redux
    const dispatch = useAppDispatch();
    const study = useAppSelector(selectStudy);
    const imageLink = study.imageLink;
    
    const navigate = useNavigate();     //allows navigation within app

    //goes to create a block
    //maybe change this to not a route?
    const goToCreateBlock = () => {
        dispatch(addBlock());
        navigate("/createblock");
    };

    //is called when the study want to be create with the "submit" button
// *** Still have to figure out how to make it synchronous
    const handleSubmit = async(event: any ) => {
        //post the STUDY data
        const postData = {title: study.title, imageLink: study.imageLink};
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        };

        const postStudy = await fetch("https://ancient-ridge-25388.herokuapp.com/studies", requestOptions)
            .then(response => response.json())
            .then(() => console.log("Posted to Backend"));

        //get blocks for the study
        // const blocks = useAppSelector((state:RootState) => state.persistedReducer.study.blocks);


        // const postBlocks = await fetch("https://ancient-ridge-25388.herokuapp.com/blocks", 
        //     {

        //     })
        navigate("../");   //go back to home when finished      
    };
  
    
    /**
     * Selects image to be uploaded to cloudinary
     */
    const selectImage = async(event: any) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];

            const data = new FormData();
            data.append("file", img);
            data.append("upload_preset", "engageapp");
            data.append("cloud_name", "engageapp");

            const uploadImage = await fetch("https://api.cloudinary.com/v1_1/engageapp/upload", {
                method: "POST",
                body: data,
            })
                .then(response => response.json())
                .then(info => dispatch(setImage({imageLink: info.secure_url})))
        }
    };

    //called if the user wants to cancel the form
    const cancel = () => {
        dispatch(cancelled());
        navigate("/");
    }

    //renders the form to create a study
    return (
        <div>
            <NavbarScroller/>     
            <div className = "wrapper">
                <h1>Create a Study</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <label>
                            Name of Study: 
                            <input type="text" name="name_of_study" defaultValue={study.title} 
                                onChange={(e) => dispatch(setTitle({title: e.target.value}))}/>
                        </label>
                    </fieldset>
                    <fieldset>
                        <label>
                            Upload Front Cover for Study: 
                            <input  type="file" name="image" onChange={selectImage} />
                        </label>
                    </fieldset>
                    <br/>
                    {study.selectedImage && 
                        <img className="photo" defaultValue={study.imageLink} src={study.imageLink} />
                    }
                    <div>
                        <h2>Study's Blocks</h2>
                        <button onClick={goToCreateBlock}> Add Block </button>
                    </div>     
                    <br/>       
                    <div>
                        <button type="submit">Create</button>
                        <button onClick={cancel}>Cancel</button>
                    </div>
                </form>
            </div>  
        </div>
    )
}

export default CreateStudy;


  
    // /**
    //  * separte post function that goes to our backend/db
    //  */
    // const post = async() => {
    //     console.log('cloud link:' + cloudLink);
    //         const data = {title: study.title, imageLink: cloudLink};
    //         const requestOptions = {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(data)
    //         };

    //          fetch("/studies", requestOptions)
    //         .then(response => response.json())
    //         .then(res => console.log(res));      
    // };
    
    // /**
    //  * separate function to upload image to the cloudinary filesystem
    //  */
    // const uploadImage = async() => {
	// 	const data = new FormData();
	// 	data.append("file", study.photo);
	// 	data.append("upload_preset", "engageapp");
	// 	data.append("cloud_name", "engageapp");

        
    //     const response = await fetch("https://api.cloudinary.com/v1_1/engageapp/upload", {
	// 		method: "POST",
	// 		body: data,
	// 	})
	// 	const info = await response.json();
    //     console.log(info.secure_url);
    //     setImageForCloud(info.secure_url);
    //   //  setImageForCloud(info.secure_url);

	// 	//  fetch("https://api.cloudinary.com/v1_1/engageapp/upload", {
	// 	// 	method: "POST",
	// 	// 	body: data,
	// 	// })
	// 	// 	.then((res) => res.json())
    //     //     .then(img => {setImageForCloud(img.secure_url)})
	// 	// 	.catch((err) => console.log(err));
            
	// };
    