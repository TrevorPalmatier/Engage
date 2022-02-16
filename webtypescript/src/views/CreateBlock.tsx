import React, {useState, useEffect} from "react";
import '../App.css';
import NavbarScroller from "../Components/NavbarScroller";
import CreateSlide from "./CreateSlide";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { setBlockTitle, setBlockImageLink, setBlockPromptText, setBlockPromptTitle, 
    cancelled, enableDisableBlockEdit, selectBlock } from "../features/blocksSlice";
import { addSlide } from "../features/slideSlice";


const CreateBlock = () => {
    // const [blockTitle, setTitle] = useState("");
    // const [photo, setPhoto] = useState("");
    // const [image, setSelectedImage] = useState("");
    // const [promptTitle, setPromptTitle] = useState("");
    // const [promptText, setPromptText] = useState("");
    // const [slides, setSlides] = useState<any>([]);
    const [selectedImage, setSelectedImage] = useState(false);
    const [promptId, setPromptId] = useState();
    const [blockId, setBlockId] = useState();
    const [isBlockId, didBlockId] = useState(false);
    const [isPromptId, didPromptId] = useState(false);

    const dispatch = useAppDispatch();

    const block  = useAppSelector(selectBlock);
    const slides = useAppSelector(state => state.persistedReducer.slides.filter(slide => slide.blockId == block?.id));

    const navigate = useNavigate();

    const postPrompt = async () => {
        console.log(block?.promptTitle);

        const promptData = {title: block?.promptTitle, promptText: block?.promptText};
        const requestOptionsPrompt = {
            method: "post",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(promptData),

        };

        fetch("/prompts", requestOptionsPrompt)
            .then(response => response.json())
            .then(info =>  setPromptId(info.id))
            .catch((err) => console.log(err));

        console.log("posted prompt");
    }

    const postBlock = async() => {
        
        const blockData = {title: block?.title, promptId: promptId, mediaURL: block?.imageLink }
        const requestOptionsBlock = {
            method: "post",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blockData)
        };

        fetch("/blocks", requestOptionsBlock)
            .then(response => response.json())
            .then(info => setBlockId(info.id))
            .then(() => console.log("blockPosted"))
            .catch((err) => console.log(err));  
        
    }

    const postSlides = async () => {
        console.log("posting slides");
        slides.map(async (slide) => {
            const slideData = {title: slide.title, backgroundText: slide.backgroundText, blockId: blockId}
            const requestOptionsSlide = {
                method: "post",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(slideData)
            };

           fetch("/slides", requestOptionsSlide)
            .then(response => response.json())
            .catch((err) => console.log(err));
        });
    }

    const handleSubmit =  async () => {
        //somehow upload to backend
         await postPrompt();
         await postBlock();
         await postSlides();
    
    };


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
                .then(info => dispatch(setBlockImageLink({imageLink: info.secure_url})))

            // setPhoto(img);
            // setSelectedImage(URL.createObjectURL(img));  
            setSelectedImage(true);
        }
    };

    const handleNewSlide = () => {
        dispatch(addSlide({blockId: block?.id}));
    };

    const handleCancel = () => {
        dispatch(cancelled({id: block?.id}))
        navigate("../createstudy");
    }

   
   // setSlides([<CreateSlide/>]);
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
                        <input type="text" defaultValue={block?.title} name="name_of_block" onChange={e=>{dispatch(setBlockTitle({id: block?.id, title: e.target.value}))}} />
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        Upload Front Cover for Block: 
                        <input type="file" name="image" onChange={selectImage} />
                    </label>
                </fieldset>
                <br/>
                <div className="createRect">
                    <h2>Create Prompt</h2>
                    <fieldset>
                        <label>
                            Title of Prompt: 
                            <input type="text" defaultValue={block?.promptTitle} name="title_of_prompt" onChange={e=>{dispatch(setBlockPromptTitle({id: block?.id, promptTitle: e.target.value}))}}/>
                        </label>
                    </fieldset>
                    <fieldset>
                        <label>
                            Prompt: 
                            <br/>
                            <textarea cols={150} defaultValue={block?.promptText} name="prompt" onChange={e=>{dispatch(setBlockPromptText({id: block?.id, promptTitle: e.target.value}))}}/>
                        </label>
                    </fieldset>
                </div>
                <br/>
                <div>
                    {
                        slides.map((slide) => {
                            return (
                            <div>
                                <div className="createRect">
                                    <CreateSlide key={slide.id} id={slide.id}/>
                                </div>
                                <br/>
                            </div>
                            )
                        })
                    }
                </div>
                <div>
                    <button className="fullWidthButton" onClick={handleNewSlide}>+ Create New Slide</button>
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