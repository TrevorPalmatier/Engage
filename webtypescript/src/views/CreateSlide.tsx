import React, {useState} from "react";
import '../App.css';
import NavbarScroller from "../Components/NavbarScroller";
import { useNavigate } from "react-router-dom";
import { setText, setTitle, cancelled, addSlide } from "../features/slideSlice";
import { useAppSelector } from "../hooks/store";
import { useDispatch } from "react-redux";

const CreateSlide = ({id}) => {
    const [images, setImages] = useState<any>([]);
    const [uploaded, setUploaded] = useState(false);
    
    const slide = useAppSelector(state => state.persistedReducer.slides).find(slide => slide.id == id);
    const dispatch = useDispatch();
  //  console.log("slide id: " + slide?.id + " slide titel: " + slide?.title);
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate("/createblock/");
    };

    const handleImages = (event) => {
        const selectedFiles : string[] =[];
        const targetFiles =event.target.files;
        const targetFilesObject= [...targetFiles]
        targetFilesObject.map((file)=>{
           return selectedFiles.push(URL.createObjectURL(file))
        })
        setImages(selectedFiles);
        setUploaded(true);
    };

    return (
        <div>
            {/* <NavbarScroller/>
            <h1>Create Study</h1> */}
            {/* <form onSubmit={handleSubmit}> */}
                <div className="wrapper">
                    <fieldset>
                        <label>
                            Title of Slide: 
                            <input type="text" defaultValue={slide?.title} name="slide_title" onChange={e=>{ dispatch(setTitle({id: slide?.id, title: e.target.value}))}} />
                        </label>
                    </fieldset>
                    <fieldset>
                        <label>
                            Background Text: 
                            <br/>
                            <textarea cols={150} defaultValue={slide?.backgroundText} name="prompt" onChange={e=>{dispatch(setText({id: slide?.id, text: e.target.value}))}}/>
                        </label>
                    </fieldset>
                    <fieldset>
                        <label>
                            Upload images to display on the slide: 
                            <input type="file"  multiple />
                        </label>
                    </fieldset>
                    {uploaded &&
                        <div>
                            {images.map((url) => {
                                return 
                                <div>
                                    <img src={url} />
                                </div>
                            })
                            }
                        </div>
                    }
                </div>
            {/* </form> */}
        </div>
    )
};
export default CreateSlide;