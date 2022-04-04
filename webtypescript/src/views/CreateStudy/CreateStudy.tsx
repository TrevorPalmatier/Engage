import React from "react";
import "../../App.scss";
import "./CreateStudy.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
  setTitle,
  setImage,
  cancelled,
  selectStudy,
} from "../../features/studySlice";
import {
  addBlock,
  cancelBlocks,
  enableDisableBlockEdit,
} from "../../features/blocksSlice";
import { RootState } from "../../store";

import { Layout } from "../../Components/Layout";
import {Image} from 'cloudinary-react';
import  GenerateRandomCode  from 'react-random-code-generator';
import { cancelSlides } from "../../features/slideSlice";
import { cancelMedia } from "../../features/mediaSlideSlice";
import * as CloudinaryAPI from "../../SharedAPI/CloudinaryAPI";
import * as CreateStudyAPI from "./CreateStudyAPI";
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

  const goToViewStudy = () => {
    dispatch(cancelled());
    navigate(`/viewstudy/${params.studyid}`);
  };

  const editBlock = (id) => {
    dispatch(enableDisableBlockEdit({ id: id, edit: true }));
    navigate(`/createblock`);
  };
  //is called when the study want to be create with the "submit" button
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!params.edit){
      await postStudy(); 
      navigate("../viewstudies");
      dispatch(cancelled());
      dispatch(cancelSlides());
      dispatch(cancelBlocks());
      dispatch(cancelMedia());
      return;
    }
    if(study.originalImage !== study.imageID){
      await CloudinaryAPI.destroyImage(study.originalImage);
    }
    const studyData = { title: study.title, imageID: study.imageID };

    await CreateStudyAPI.updateStudy(params.studyid, studyData);

    dispatch(cancelled());
    dispatch(cancelSlides());
    dispatch(cancelBlocks());
    dispatch(cancelMedia());
    
    navigate(`../viewstudy/${params.studyid}`);
    
  };

  const postStudy = async () => {
    //generate an access code
    const accessCode = GenerateRandomCode.TextNumCode(3,3);
    //post the STUDY data
    const postData = { title: study.title, "imageID": study.imageID, code: accessCode };

    const info = await CreateStudyAPI.postStudy(postData);

    await postBlocks(info);
  };

  const postBlocks = async(studyInfo) => {
    blocks.forEach( async (block) => {
      //block data to be posted
      const blockData = {
        title: block?.title,
        promptTitle: block?.promptTitle,
        promptText: block?.promptText,
        imageID: block?.imageID,
        study: studyInfo,
      };

      //post request options for the block
        const info = await CreateStudyAPI.postBlock(blockData);

        await postSlides(block?.id, info);

    });
  };

  /**
   * This method is able post the slides for the block to the api
   */
  const postSlides = async (blockId, blockInfo) => {
    //loops through all the slides and does a post request for each one
    await Promise.all(slides.map( async (slide) => {
      if (slide.blockId === blockId) {
        const slideData = {
          title: slide.title,
          backgroundText: slide.backgroundText,
          option: slide.option,
          block: blockInfo,
        }; //slide data

          const info = await CreateStudyAPI.postSlide(slideData);
          await postSlideMedia(slide.id, info);
      }
    }));
  };

  const postSlideMedia = async (slideId, slideInfo) => {
    await Promise.all(slideMedia.map(async (media) => {
      if (media.slideId === slideId) {
        const mediaData = {
          imageID: media.imageID,
          type: media.type,
          position: media.position,
          slide: slideInfo,
        };
        
        await CreateStudyAPI.postSlideMedia(mediaData);
      }
    }));
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
      const info = await CloudinaryAPI.uploadSingleImage(reader);
      if(study?.imageID !== study.originalImage){
        await CloudinaryAPI.destroyImage(study?.imageID);
      }
      dispatch(setImage({imageID: info.publicId}));
    }
  };

  //called if the user wants to cancel the form
  const cancel = async (e) => {
    e.preventDefault();

    //only destroy during creation of study
    if(!params.edit) {
        await CloudinaryAPI.destroyImage(study.imageID);

      await Promise.all(slideMedia?.map(async (media) => {
          await CloudinaryAPI.destroyImage(media.imageID);
      }));
      await Promise.all(blocks?.map(async (block) => {
        await CloudinaryAPI.destroyImage(block.imageID);
      }));
    }

    if(study.imageID !== study.originalImage){
      await CloudinaryAPI.destroyImage(study.imageID);
    }
    
    dispatch(cancelled());
    dispatch(cancelSlides());
    dispatch(cancelBlocks());
    dispatch(cancelMedia());

    if (!params.edit) {
      navigate(-1);
    } else {
      navigate(`../viewstudy/${params.studyid}`);
    }
  };

  //renders the form to create a study
  return (
    <Layout>
      <div className="viewHeader">
        {params.edit === 'true' ? <h1>Edit Study: {study.title}</h1>
         : <h1>Create a Study</h1>
        }
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
          <div>
            <h2>Study's Blocks</h2>
          </div>
          {!params.edit && (
            <div>
              <button onClick={goToCreateBlock} className="buttonText">
              Add Block
              </button>
            
              <div className="container_blocks">
                
                <div className="create-blocks-container">
                  {blocks.map((block) => {
                    return (
                      <div className="square" key={block.id} onClick={() => editBlock(block.id)}>
                        <Image cloudName='engageapp' publicId={block.imageID}/>
                        <h2>{block.title}</h2>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {params.edit && (
            <div>
              <button onClick={goToViewStudy} className="buttonText">
                {" "}
                Edit Blocks{" "}
              </button>
            </div>
          )}
          <div className="submitButtons">
            <button type="submit" className="buttonText">
              Save
            </button>
            <button onClick={(e) => cancel(e)} className="buttonText">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateStudy;
