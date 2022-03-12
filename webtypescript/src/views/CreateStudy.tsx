import React from "react";
import "../App.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import {
  setTitle,
  setImage,
  cancelled,
  selectStudy,
} from "../features/studySlice";
import {
  addBlock,
  cancelBlocks,
  enableDisableBlockEdit,
} from "../features/blocksSlice";
import { RootState } from "../store";
import "../Styling/CreateStudy.scss";
import { Layout } from "../Components/Layout";
import {Image} from 'cloudinary-react';
import  GenerateRandomCode  from 'react-random-code-generator';
import { cancelSlides } from "../features/slideSlice";
import { cancelMedia } from "../features/mediaSlideSlice";

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
  const blocks = useAppSelector(
    (state: RootState) => state.persistedReducer.study.blocks
  ); //get blocks for the study
  const slides = useAppSelector((state) => state.persistedReducer.slides); //selects slides for a specific block
  const slideMedia = useAppSelector((state) => state.persistedReducer.media); //selects all media for all sldies

  const params = useParams();
  const navigate = useNavigate(); //allows navigation within app
  //goes to create a block

  const goToCreateBlock = () => {
    dispatch(addBlock());
    navigate("/createblock");
  };

  const goToViewBlocks = () => {
    dispatch(cancelled());
    navigate(`/viewblocks/${params.studyid}`);
  };

  const editBlock = (id) => {
    dispatch(enableDisableBlockEdit({ id: id, edit: true }));
    navigate(`/createblock`);
  };
  //is called when the study want to be create with the "submit" button
  // *** Still have to figure out how to make it synchronous
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!params.edit){
      postStudy();
      navigate("../viewstudies");
      dispatch(cancelled());
      dispatch(cancelSlides());
      dispatch(cancelBlocks());
      dispatch(cancelMedia());
      return;
    }
    
    const postData = { title: study.title, imageID: study.imageID };
    const requestOptions = {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };

    fetch(
      `https://ancient-ridge-25388.herokuapp.com/studies/${params.studyid}`,
      requestOptions
    ).then((response) => response.json());

    dispatch(cancelled());
    dispatch(cancelSlides());
    dispatch(cancelBlocks());
    dispatch(cancelMedia());
    
      navigate(`../viewblocks/${params.studyid}`);
    
  };

  const postStudy = async () => {
    //generate an access code
    const accessCode = GenerateRandomCode.TextNumCode(3,3);
    //post the STUDY data
    const postData = { title: study.title, "imageID": study.imageID, imgOrientation: study.imgOrientation, code: accessCode };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };
    
    try{
      const response = await fetch("https://ancient-ridge-25388.herokuapp.com/studies", requestOptions);
      const info = await response.json();
      postBlocks(info);
    }catch(error) {
      console.log(error)
    }
  };

  const postBlocks = async(studyInfo) => {
    blocks.forEach( async (block) => {
      //block data to be posted
      const blockData = {
        title: block?.title,
        promptTitle: block?.promptTitle,
        promptText: block?.promptText,
        imageID: block?.imageID,
        imgOrientation: block?.imgOrienation,
        study: studyInfo,
      };

      //post request options for the block
      const requestOptionsBlock = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blockData),
      };
      try{
        // ***  need to save the block id before calling the "postSlides()" function
        const response = await fetch(
          "https://ancient-ridge-25388.herokuapp.com/blocks",
          requestOptionsBlock
        );

        const info = await response.json();
        await postSlides(block?.id, info)
        }catch(error){
          console.log(error);
        }
    });
  };

  /**
   * This method is able post the slides for the block to the api
   */
  const postSlides = async (blockId, blockInfo) => {
    //loops through all the slides and does a post request for each one
    slides.forEach( async (slide) => {
      if (slide.blockId === blockId) {
        const slideData = {
          title: slide.title,
          backgroundText: slide.backgroundText,
          option: slide.option,
          block: blockInfo,
        }; //slide data

        const requestOptionsSlide = {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slideData),
        };
        try{
          const response = await fetch(
            "https://ancient-ridge-25388.herokuapp.com/slides",
            requestOptionsSlide
          )
          const info = await response.json();
          await postSlideMedia(slide.id, info);
        }catch(error){
          console.log(error);
        }     
      }
    });
  };

  const postSlideMedia = async (slideId, slideInfo) => {
    slideMedia.forEach(async (media) => {
      if (media.slideId === slideId) {
        const mediaData = {
          imageID: media.imageID,
          type: media.type,
          orientation: media.orientation,
          position: media.position,
          slide: slideInfo,
        };
        const requestOptionsMedia = {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mediaData),
        };
        try{
          const response = await fetch(
            "https://ancient-ridge-25388.herokuapp.com/slidemedia",
            requestOptionsMedia
        )
        }catch(error){
          console.log(error);
        }
      }
    });
  }

  /**
   * Selects image to be uploaded to cloudinary
   */
  const selectImage = async (event: any) => {
    event.preventDefault();
    let img = event.target.files?.[0];
    if (!img) {
      return;
    }

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
          await dispatch(setImage({imageID: info.publicId, imgOrientation: findDimensions(info.height, info.width)}));
        }catch(error){
          console.error(error)
        }
    }
  };

  const findDimensions = (height, width) => {
    if (height > width) {
      return "vertical";
    } else {
      return "landscape";
    }
  };

  //called if the user wants to cancel the form
  const cancel = async (e) => {
    e.preventDefault();
    dispatch(cancelled());
    dispatch(cancelSlides());
    dispatch(cancelBlocks());
    dispatch(cancelMedia());

    const data = {"public_id": study.imageID};

    fetch(
      "https://ancient-ridge-25388.herokuapp.com/deleteimage",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    )
      .then(async (response) => await response.json())

    if (!params.edit) {
      await navigate("/viewstudies");
    } else {
      await navigate(`../viewblocks/${params.studyid}`);
    }
  };

  //renders the form to create a study
  return (
    <Layout>
      <div className="viewHeader">
        <h1>Create a Study</h1>
      </div>

      <div className="form">
        <form onSubmit={handleSubmit} className="form">
          <fieldset>
            <label>
              Name of Study:
              <input
                type="text"
                name="name_of_study"
                defaultValue={study.title}
                onChange={(e) => dispatch(setTitle({ title: e.target.value }))}
              />
            </label> 
          </fieldset>
          <fieldset>
            <label>
              Upload Front Cover for Study:
              <input type="file" name="image" onChange={selectImage} />
            </label>
          </fieldset>
          {study.selectedImage && (
            <Image className="photo" cloudName='engageapp' publicId={study.imageID}/>
          )}
          {!params.edit && (
            <div className="container_blocks">
              <h2>Study's Blocks</h2>
              <div className="blockGrid">
                {blocks.map((block) => {
                  return (
                    <div key={block.id} onClick={() => editBlock(block.id)}>
                      <Image className="gridPhoto" cloudName='engageapp' publicId={block.imageID}/>
                      <h3>{block.title}</h3>
                    </div>
                  );
                })}
              </div>
              <div>
                <button onClick={goToCreateBlock} className="buttonText">
                  {" "}
                  Add Block{" "}
                </button>
              </div>
            </div>
          )}
          {params.edit && (
            <div>
              <button onClick={goToViewBlocks} className="buttonText">
                {" "}
                Edit Blocks{" "}
              </button>
            </div>
          )}
          <div className="submitButtons">
            <button type="submit" className="buttonText">
              Create
            </button>
            <button onClick={(e) => cancel(e)} className="buttonText">
              Delete & Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateStudy;
