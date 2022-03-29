import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Image} from "cloudinary-react";
import "../../App.scss";
import "./ViewBlock.scss";
import FakeScreen from "../FakeScreen/FakeScreen";
import { useAppDispatch } from "../../hooks/store";
import { addOldBlock, cancelBlocks } from "../../features/blocksSlice";
import { addOldSlide, cancelSlides } from "../../features/slideSlice";
import {
  addOldMedia,
  cancelMedia,
} from "../../features/mediaSlideSlice";
import { Layout } from "../../Components/Layout";
import * as ViewBlockAPI from "./ViewBlockAPI";
import * as CloudinaryAPI from "../../SharedAPI/CloudinaryAPI";

const ViewBlock = () => {
  const [block, setData] = useState<any>({});
  const [entries, setEntries] = useState<any>([]);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('Component is mounting');
    dispatch(cancelBlocks);
    dispatch(cancelSlides);
    dispatch(cancelMedia);
    const abortController = new AbortController();

      fetch(`/blocks/${params.id}`, {
        signal: abortController.signal,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setData(data);
          console.log(data);
        })
        .catch((error) => console.log(error));

      fetch(
        `/blocks/entries/${params.id}`,
        { signal: abortController.signal }
      )
        .then((res) => res.json())
        .then((data) => {
          setEntries(data.entries);
        })
        .catch((error) => console.log(error));

    return () => {
      console.log("unmounting");
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
          promptTitle: block.promptTitle,
          promptText: block.promptText,
        })
    );

    //dispatch slides
    block.slides.forEach(async (slide) => {
        //create old slide in persist store
        dispatch(
          addOldSlide({
            blockId: block.id,
            slideId: slide.id,
            option: slide.option,
            title: slide.title,
            backgroundText: slide.backgroundText,
          })
        );
        
        const info = await ViewBlockAPI.fetchSlides(slide.id);
        dispatchMedia(info);
    });
    };

  const dispatchMedia = (slideInfo) => {
    slideInfo.medias.forEach((media) => {
      dispatch(
        addOldMedia({
          slideId: slideInfo.id,
          mediaId: media.id,
          type: media.type,
          position: media.position,
          imageID: media.imageID,
        })
      );
    });
  };

  const deleteBlock = async () => {
    await CloudinaryAPI.destroyImage(block.imageID);
    block.slides.forEach(async (slide) => {
      const slideInfo = await ViewBlockAPI.fetchSlides(slide.id);
      slideInfo.medias.forEach(async (media) => {
        if(media.type === "image"){
          await CloudinaryAPI.destroyImage(media.imageID);
        }
      })
    })
    entries.forEach( async (entry) => {
      await CloudinaryAPI.destroyImage(entry.imageID);
    })
    await ViewBlockAPI.deleteBlock(params.id);
    navigate(`/viewstudy/${block.study.id}`);
  }
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
        <button className="buttonText" onClick={() => {
          const confirmBox = window.confirm("Any participants entries will be deleted.\nAre you sure you want to delete this Block?")
          if(confirmBox === true){
            deleteBlock();
          }
        }}>
          Delete Block
        </button>
      </div>
      <div className="maincomponent">
      <div >
        <h2>Slides</h2>
      </div>
        <div className="organizeScreens">
          {block.slides?.map((slide) => {
            return (
              <div key={slide.id}>
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
