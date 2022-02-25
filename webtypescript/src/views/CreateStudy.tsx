import React, {useState} from "react";
import '../App.css';
import NavbarScroller from "../Components/NavbarScroller";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { setTitle, setImage, cancelled, selectStudy} from "../features/studySlice";
import { addBlock } from "../features/blocksSlice";
import { RootState } from "../store";

/** 
 * Notes for things to maybe implement:
    *   create blocks similar to slides?
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
    const blocks = useAppSelector((state:RootState) => state.persistedReducer.study.blocks);  //get blocks for the study
    const slides = useAppSelector(state => state.persistedReducer.slides);      //selects slides for a specific block
        
    const params = useParams();
    const navigate = useNavigate();     //allows navigation within app

    //goes to create a block
    //maybe change this to not a route?
    const goToCreateBlock = () => {
        dispatch(addBlock());
        navigate("/createblock");
    };

    //is called when the study want to be create with the "submit" button
// *** Still have to figure out how to make it synchronous
    const handleSubmit = (event) => {
        event.preventDefault();

        if(params.edit){
            const postData = {title: study.title, imageLink: study.imageLink};
            const requestOptions = {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData)};

            fetch(`https://ancient-ridge-25388.herokuapp.com/studies/${params.studyid}`, requestOptions)
            .then(response => response.json());

            navigate(`../viewblocks/${params.studyid}`);
        }else{
            postStudy();
        }   
    }
    
    const postStudy = () => {
        //post the STUDY data
        const postData = {title: study.title, imageLink: study.imageLink};
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        };

        fetch("https://ancient-ridge-25388.herokuapp.com/studies", requestOptions)
            .then(response => response.json())
            .then(info => postBlocks(info))
            .then(() => console.log("Posted to Backend"));
    }

    const postBlocks = (studyInfo) => {
        blocks.map((block) => {
            
            //block data to be posted
            const blockData = {title: block?.title, "promptTitle": block?.promptTitle, "promptText": block?.promptText, "mediaURL": block?.imageLink, study: studyInfo }
            
            //post request options for the block
            const requestOptionsBlock = {
                method: "post",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(blockData)
            };

    // ***  need to save the block id before calling the "postSlides()" function
            fetch("https://ancient-ridge-25388.herokuapp.com/blocks", requestOptionsBlock)
                .then(response => response.json())
                .then(info => postSlides(block?.id, info))
                .then(() => console.log("blockPosted"))
                .catch((err) => console.log(err));      
        });

        navigate("../");   //go back to home when finished      
    };
  
     /**
     * This method is able post the slides for the block to the api
     */
    const postSlides =  (blockId, blockInfo) => {
        //loops through all the slides and does a post request for each one
        console.log("id of block: " + blockInfo.Id)
        slides.map((slide) => {
            if(slide.blockId == blockId){
                const slideData = {title: slide.title, "backgroundText": slide.backgroundText, "block": blockInfo}  //slide data
                const requestOptionsSlide = {
                    method: "post",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(slideData)
                };

            fetch("https://ancient-ridge-25388.herokuapp.com/slides", requestOptionsSlide)
                .then(response => response.json())
                .then(() => console.log("posted slides" ))
                .catch((err) => console.log(err));      
            }                                                                                                    
        });
       // navigate("../createslide");
        
    }

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
        if(!params.edit){
            navigate("/");
        }else{
            navigate(`../viewblocks/${params.studyid}`)
        }
    }

    console.log(study.title);
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
                        <img className="photo"  src={study.imageLink} />
                    }
                    {!params.edit && 
                        <div>
                            <h2>Study's Blocks</h2>
                            {blocks.map((block) =>{
                                return (
                                <div  key={block.id}>
                                    <img className="photo" defaultValue={block.imageLink} src={block.imageLink} />
                                    <p>{block.title}</p>
                                </div>
                                )
                            })}
                            <button onClick={goToCreateBlock}> Add Block </button>
                     </div>  
                    }   
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
    