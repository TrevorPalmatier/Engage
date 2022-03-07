import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

    dispatch(
      addOldBlock({
        id: block.id,
        title: block.title,
        imagelink: block.imageID,
        promptTitle: block.promptTitle,
        promptText: block.promptText,
      })
    );
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
      fetch(`https://ancient-ridge-25388.herokuapp.com/slides/${slide.id}`)
        .then((response) => response.json())
        .then((info) => {
          dispatchMedia(info);
        });
    });

    navigate(`/createblock/${block.study.id}/${block.id}`);
  };

  const dispatchMedia = (slideInfo) => {
    slideInfo.medias.forEach((media) => {
      dispatch(
        addOldMedia({
          slideId: slideInfo.id,
          mediaId: media.id,
          type: media.type,
          orientation: media.orientation,
          position: media.positioni,
          url: media.imageID,
        })
      );
    });
  };

  return (
    <Layout>
      <div className="viewHeader">
        <h1>Block: {block.title}</h1>
        <img className="blockImage" src={block.imageID} alt="cover for block"></img>
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
      <div className="headersForComponents">
        <h2>Slides</h2>
        <h2>Entries</h2>
      </div>
      <div className="maincomponent">
        <div className="organizeScreens">
          {block.slides?.map((slide) => {
            return (
              <div>
                <FakeScreen key={slide.id} id={slide.id} />
              </div>
            );
          })}
        </div>
        <div className="entriesGrid">
          {entries?.map((entry) => {
            var img = new Image();
            img.src = entry.imageID;
            const height = img.height;
            const width = img.width;
            if (height > width) {
              return (
                <div className="taller" key={entry.id}>
                  <img src={img.src} alt="tall" />
                  <h3>{entry.description}</h3>
                </div>
              );
            } else {
              return (
                <div className="wider" key={entry.id}>
                  <img src={img.src} alt="wide" />
                  <h3>{entry.description}</h3>
                </div>
              );
            }
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ViewBlock;
