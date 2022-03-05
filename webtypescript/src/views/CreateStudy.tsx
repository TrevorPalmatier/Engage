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
  enableDisableBlockEdit,
} from "../features/blocksSlice";
import { RootState } from "../store";
import "../Styling/CreateStudy.scss";
import { Layout } from "../Components/Layout";

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
  //maybe change this to not a route?
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
  const handleSubmit = (event) => {
    event.preventDefault();

    if (params.edit) {
      const postData = { title: study.title, imageLink: study.imageLink };
      const requestOptions = {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      };

      fetch(
        `https://ancient-ridge-25388.herokuapp.com/studies/${params.studyid}`,
        requestOptions
      ).then((response) => response.json());

      navigate(`../viewblocks/${params.studyid}`);
    } else {
      postStudy();
    }
  };

  const postStudy = () => {
    //post the STUDY data
    const postData = { title: study.title, imageLink: study.imageLink };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };

    fetch("https://ancient-ridge-25388.herokuapp.com/studies", requestOptions)
      .then((response) => response.json())
      .then((info) => postBlocks(info))
      .then(() => console.log("Posted to Backend"));
  };

  const postBlocks = (studyInfo) => {
    blocks.forEach((block) => {
      //block data to be posted
      const blockData = {
        title: block?.title,
        promptTitle: block?.promptTitle,
        promptText: block?.promptText,
        mediaURL: block?.imageLink,
        study: studyInfo,
      };

      //post request options for the block
      const requestOptionsBlock = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blockData),
      };

      // ***  need to save the block id before calling the "postSlides()" function
      fetch(
        "https://ancient-ridge-25388.herokuapp.com/blocks",
        requestOptionsBlock
      )
        .then((response) => response.json())
        .then((info) => postSlides(block?.id, info))
        .catch((err) => console.log(err));
    });

    navigate("../"); //go back to home when finished
  };

  /**
   * This method is able post the slides for the block to the api
   */
  const postSlides = (blockId, blockInfo) => {
    //loops through all the slides and does a post request for each one
    slides.forEach((slide) => {
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

        fetch(
          "https://ancient-ridge-25388.herokuapp.com/slides",
          requestOptionsSlide
        )
          .then((response) => response.json())
          .then((info) => postSlideMedia(slide.id, info))
          .catch((err) => console.log(err));
      }
    });
  };

  const postSlideMedia = (slideId, slideInfo) => {
    slideMedia.forEach((media) => {
      if (media.slideId === slideId) {
        const mediaData = {
          mediaUrl: media.url,
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

        fetch(
          "https://ancient-ridge-25388.herokuapp.com/slidemedia",
          requestOptionsMedia
        )
          .then((response) => response.json())
          .then(() => console.log("posted media"))
          .catch((err) => console.log(err));
      }
    });
  }

  /**
   * Selects image to be uploaded to cloudinary
   */
  const selectImage = async (event: any) => {
    let img = event.target.files?.[0];
    if (!img) {
      return;
    }
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "engageapp");
      data.append("cloud_name", "engageapp");

      fetch(
        "https://api.cloudinary.com/v1_1/engageapp/upload",
        {
          method: "POST",
          body: data,
        }
      )
        .then((response) => response.json())
        .then((info) => dispatch(setImage({ imageLink: info.secure_url })));
  };

  //called if the user wants to cancel the form
  const cancel = () => {
    dispatch(cancelled());
    if (!params.edit) {
      navigate("/");
    } else {
      navigate(`../viewblocks/${params.studyid}`);
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
            <img className="photo" src={study.imageLink} alt="cover for study" />
          )}
          {!params.edit && (
            <div className="container_blocks">
              <h2>Study's Blocks</h2>
              <div className="blockGrid">
                {blocks.map((block) => {
                  return (
                    <div key={block.id} onClick={() => editBlock(block.id)}>
                      <img
                        className="gridPhoto"
                        defaultValue={block.imageLink}
                        src={block.imageLink}
                        alt="grid"
                      />
                      <p>{block.title}</p>
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
            <button onClick={cancel} className="buttonText">
              Delete & Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateStudy;
