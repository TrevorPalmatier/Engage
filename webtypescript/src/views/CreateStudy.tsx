import React, {useState} from "react";
import '../App.css';
import NavbarScroller from "../Components/NavbarScroller";
import { useNavigate } from "react-router-dom";
import { getImpliedNodeFormatForFile } from "typescript";
import CreateBlock from "./CreateBlock";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { setTitle, setImage, cancelled, selectStudy} from "../features/studySlice";
import { addBlock } from "../features/blocksSlice";

const CreateStudy = () => {
    //const [title, setTitle] = useState("");
    //const [imageLink, setSelectedImage] = useState("");
    const [cloudLink, setImageForCloud] = useState("");
    //const [photo, setPhoto] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [selectedImage, setSelectedImage] = useState(false);
    //const [addBlock, setAddBlock] = useState(false);
    const study = useAppSelector(selectStudy);
    const imageLink = study.imageLink;
    

    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    console.log(study.title);

    const routeChange =() => {
        navigate("/");
    };

    const goToCreateBlock = () => {
        //setAddBlock(true);
        console.log(study.title);
        //dispatch(setTitle({title: study.title}));
        dispatch(addBlock());
        navigate("/createblock");
    };

    const handleSubmit = async(event: any ) => {
            
        const postData = {title: study.title, imageLink: study.imageLink};
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        };

        const postStudy = await fetch("/studies", requestOptions)
            .then(response => response.json())
            .then(() => console.log("Posted to Backend"));



        //upload()
        // post();

        event.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            }, 3000);

        dispatch(cancelled());
                    
    };
    
    /**
     * separte post function that goes to our backend/db
     */
    const post = async() => {
        console.log('cloud link:' + cloudLink);
            const data = {title: study.title, imageLink: cloudLink};
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            };

             fetch("/studies", requestOptions)
            .then(response => response.json())
            .then(res => console.log(res));      
    };
    
    /**
     * separate function to upload image to the cloudinary filesystem
     */
    const uploadImage = async() => {
		const data = new FormData();
		data.append("file", study.photo);
		data.append("upload_preset", "engageapp");
		data.append("cloud_name", "engageapp");

        
        const response = await fetch("https://api.cloudinary.com/v1_1/engageapp/upload", {
			method: "POST",
			body: data,
		})
		const info = await response.json();
        console.log(info.secure_url);
        setImageForCloud(info.secure_url);
      //  setImageForCloud(info.secure_url);

		//  fetch("https://api.cloudinary.com/v1_1/engageapp/upload", {
		// 	method: "POST",
		// 	body: data,
		// })
		// 	.then((res) => res.json())
        //     .then(img => {setImageForCloud(img.secure_url)})
		// 	.catch((err) => console.log(err));
            
	};
    
    console.log(imageLink);
    
    /**
     * Selects image to be uploaded
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
                .then(() => console.log({cloudLink}));
            // setPhoto(img);
            // setSelectedImage(URL.createObjectURL(img));  
            setSelectedImage(true);
        }
    };

    const cancel = () => {
        dispatch(cancelled());
        navigate("/");
    }


    return (
        <div>
            <NavbarScroller/>     
            <div className = "wrapper">
                <h1>Create a Study</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                            <label>
                                Name of Study: 
                                <input type="text" name="name_of_study" defaultValue={study.title} onChange={(e) => dispatch(setTitle({title: e.target.value}))}/>
                            </label>
                        </fieldset>
                        <fieldset>
                            <label>
                                Upload Front Cover for Study: 
                                <input  type="file" name="image" onChange={selectImage} />
                            </label>
                        </fieldset>
                            <img className="photo" defaultValue={study.imageLink} src={study.imageLink} />
                        <div>
                            <h2>Study's Blocks</h2>
                            <button onClick={goToCreateBlock}>Add Block </button>
                        </div>     
                        <br/>       
                        <div>
                            <button type="submit">Create</button>
                            <button onClick={cancel}>Cancel</button>
                            </div>
                            {submitted && 
                                <div>
                                    <p>{study.title}</p>
                                    <p>{cloudLink}</p>
                                </div>
                            }
                </form>
            </div>  
        </div>
    )
}

export default CreateStudy;