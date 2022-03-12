import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Image} from "cloudinary-react";
import "../App.scss";
import "../Styling/ViewBlock.scss";
import FakeScreen from "./FakeScreen";
import { useAppDispatch } from "../hooks/store";
import { addOldBlock, cancelBlocks } from "../features/blocksSlice";
import { addOldSlide, cancelSlides } from "../features/slideSlice";
import {
  addOldMedia,
  cancelMedia,
} from "../features/mediaSlideSlice";
import { Layout } from "../Components/Layout";
const ViewBlock = () => {
  const [block, setData] = useState<any>({});
  const [entries, setEntries] = useState<any>([]);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cancelMedia());
    dispatch(cancelBlocks());
    dispatch(cancelSlides());
    const abortController = new AbortController();

      fetch(`https://ancient-ridge-25388.herokuapp.com/blocks/${params.id}`, {
        signal: abortController.signal,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => console.log(error));

      fetch(
        `https://ancient-ridge-25388.herokuapp.com/blocks/entries/${params.id}`,
        { signal: abortController.signal }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setEntries(data.entries);
        })
        .catch((error) => console.log(error));

    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };

  }, []);

  const goToEditBlock = async (e) => {
    e.preventDefault();
    
    dispatchData();
    navigate(`/editblock/${block.study.id}/${block.id}`);
  };

  const dispatchData = async () => {

    //dispatch the block data
    dispatch(
        addOldBlock({
          id: block.id,
          title: block.title,
          imageID: block.imageID,
          imgOriengation: block.imgOrientation,
          promptTitle: block.promptTitle,
          promptText: block.promptText,
        })
    );

    //dispatch slides
    block.slides.forEach((slide) => {
        //create old slide in persist store
        dispatch(
          addOldSlide({
            id: slide.id,
            blockId: block.id,
            slideId: slide.id,
            option: slide.option,
            title: slide.title,
            backgroundText: slide.backgroundText,
          })
        );
        
        try{
            //fetch media for slides and dispatch
            fetch(`https://ancient-ridge-25388.herokuapp.com/slides/${slide.id}`)
            .then((response) => response.json())
            .then((info) => {dispatchMedia(info)});
        }catch(error) {
            console.error(error);
        }
    });
    };

  const dispatchMedia = (slideInfo) => {
    slideInfo.medias.forEach((media) => {
      dispatch(
        addOldMedia({
          slideId: slideInfo.id,
          mediaId: media.id,
          type: media.type,
          orientation: media.orientation,
          position: media.position,
          imageID: media.imageID,
        })
      );
    });
  };


  return (
    <Layout>
      <div className="viewHeader">
        <h1>Block: {block.title}</h1>
        <Image className="blockImage" cloudName='engageapp' publicId={block.imageID}/>
      </div>
      <div className="promptInfo">
        <h2>Prompt Title: {block.promptTitle}</h2>
        <h3>Prompt Text: {block.promptText}</h3>
      </div>
      <div className="submitButtons">
        <button
          className="buttonText"
          onClick={(e) => {
            goToEditBlock(e);
          }}
        >
          {" "}
          Edit Block{" "}
        </button>
      </div>
      <br />

      <div className="maincomponent">
      <div >
        <h2>Slides</h2>
      </div>
        <div className="organizeScreens">
          {block.slides?.map((slide) => {
            return (
              <div>
                <FakeScreen key={slide.id} id={slide.id} />
              </div>
            );
          })}
        </div>
        <div>
          <h2>Entries</h2>
        </div>
        <div className="grid-container">
          {entries?.map((entry) => {
              return (
                <div  key={entry.id}>
                  <Image cloudName='engageapp' publicID={entry.imageID} />
                  <p>{entry.text}</p>
                </div>
              )
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ViewBlock;
