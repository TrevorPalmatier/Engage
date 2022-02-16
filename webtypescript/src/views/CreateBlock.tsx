import React, {useState, useEffect} from "react";
import '../App.css';
import NavbarScroller from "../Components/NavbarScroller";
import CreateSlide from "./CreateSlide";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { setBlockTitle, setBlockImageLink, setBlockPromptText, setBlockPromptTitle, 
    cancelled, enableDisableBlockEdit, selectBlock } from "../features/blocksSlice";
import { addSlide } from "../features/slideSlice";
import { roundToInt, Int } from "../int";
import { InferencePriority } from "typescript";


const CreateBlock = () => {
    // const [blockTitle, setTitle] = useState("");
    // const [photo, setPhoto] = useState("");
    // const [image, setSelectedImage] = useState("");
    // const [promptTitle, setPromptTitle] = useState("");
    // const [promptText, setPromptText] = useState("");
    // const [slides, setSlides] = useState<any>([]);
    const [selectedImage, setSelectedImage] = useState(false);
    const [responsePrompt, setResPrompt] = useState({});
    const [blockId, setBlockId] = useState("");


    //console.log(promptId);
    const dispatch = useAppDispatch();

    const block  = useAppSelector(selectBlock);
    const slides = useAppSelector(state => state.persistedReducer.slides.filter(slide => slide.blockId == block?.id));

    const navigate = useNavigate();

    const postPrompt = async () => {
        console.log(block?.promptTitle);

        const promptData = {"title": block?.promptTitle, "promptText": block?.promptText};
        const requestOptionsPrompt = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(promptData),

        };
  // "allowedHosts": "all", 
  // "proxy": "https://ancient-ridge-25388.herokuapp.com"
      //  setPromptId(2);
        const response = await fetch("https://ancient-ridge-25388.herokuapp.com/prompts", requestOptionsPrompt)
            .then(response => response.json())
            //.then(info => setPromptId(2))
            //.then((response) => response.json().log())
           // .then((info) => {info.log(); postBlock();}) 
            .then((res) => {setResPrompt({id: res.id, title: res.title, promptText: res.text}); postBlock();})
            .then(() => console.log(responsePrompt))
            .catch((err) => console.log(err));
        //console.log(response.title);
        
        console.log("posted prompt");
    }

    const postBlock = () => {
        console.log(responsePrompt);
        const blockData = {title: block?.title, "prompt": {id: 50, title: block?.promptTitle, "promptText": block?.promptText}, "mediaURL": block?.imageLink }
        const requestOptionsBlock = {
            method: "post",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blockData)
        };

        return fetch("https://ancient-ridge-25388.herokuapp.com/blocks", requestOptionsBlock)
            .then(response => response.json())
            .then(async info => await setBlockId(info.id))
            .then(() => postSlides())
            .then(() => console.log("blockPosted"))
            .catch((err) => console.log(err));  
    }

    const postSlides =  () => {
        console.log("posting slides");
        slides.map(async (slide) => {
            const slideData = {title: slide.title, "backgroundText": slide.backgroundText, "blockId": blockId}
            const requestOptionsSlide = {
                method: "post",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(slideData)
            };

           fetch("https://ancient-ridge-25388.herokuapp.com/slides", requestOptionsSlide)
            .then(response => response.json())
            .catch((err) => console.log(err));
        });
    }

    const handleSubmit =  () => {
        //somehow upload to backend
        postPrompt();
    };


   /**
     * Selects image to be uploaded
     */
    const selectImage = (event: any) => {
        
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];

            const data = new FormData();
            data.append("file", img);
            data.append("upload_preset", "engageapp");
            data.append("cloud_name", "engageapp");

            fetch("https://api.cloudinary.com/v1_1/engageapp/upload", {
                method: "POST",
                body: data,
            })
                .then(response => response.json())
                .then(info => dispatch(setBlockImageLink({imageLink: info.secure_url})))

            // setPhoto(img);
            // setSelectedImage(URL.createObjectURL(img));  
            setSelectedImage(true);
            console.log("fetching");
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
                            <textarea cols={150} defaultValue={block?.promptText} name="prompt" onChange={e=>{dispatch(setBlockPromptText({id: block?.id, promptText: e.target.value}))}}/>
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