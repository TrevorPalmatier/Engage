import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Image} from "cloudinary-react";
import "../../App.scss";
import "./ViewBlock.scss";
import FakeScreen from "../FakeScreen/FakeScreen";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { addOldBlock, cancelBlocks } from "../../features/blocksSlice";
import { addOldSlide, cancelSlides } from "../../features/slideSlice";
import {
  addOldMedia,
  cancelMedia,
} from "../../features/mediaSlideSlice";
import { Layout } from "../../Components/Layout";
import * as ViewBlockAPI from "./ViewBlockAPI";
import * as CloudinaryAPI from "../../SharedAPI/CloudinaryAPI";
import * as XLSX from 'xlsx';
import BaseModalWrapper from "../../ModalPopup/BaseModalWrapper";

const ViewBlock = () => {
  const [block, setData] = useState<any>({});
  const [entries, setEntries] = useState<any>([]);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mediaApp = useAppSelector((state) => state.persistedReducer.media).filter(
    (media1) => media1.slideId === 130
  );

  useEffect(() => {
    console.log('Component is mounting');
    
    const abortController = new AbortController();
      dispatch(cancelBlocks);
      dispatch(cancelSlides);
      dispatch(cancelMedia);
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

  const downloadData = async (e) =>{
    e.preventDefault();
    console.log("download button is pressed")

    //get the data 
    const response = await fetch(`https://ancient-ridge-25388.herokuapp.com/blocks/entries/${params.id}`)
    // const entries = response.json()

    //create a new worksheet
    const workSheet = XLSX.utils.json_to_sheet(entries)

    //create a new workbook
    const workBook = XLSX.utils.book_new()

    //attach the sheet to the book
    XLSX.utils.book_append_sheet(workBook, workSheet,"entries")

    //buffer 
    let buf = XLSX.write(workBook, {bookType:"xlsx", type: "buffer"})

    //generate a binary string with browser 
    XLSX.write(workBook, {bookType: "xlsx", type: "binary"})

    //download the file as blockData
    const nameOfStudy = block.title + "_entries.xlsx"
    XLSX.writeFile(workBook, nameOfStudy) 
  }

  const goToEditBlock = async (e) => {
    e.preventDefault();

    await dispatchData();
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
            id: slide.id,
            blockId: block.id,
            slideId: slide.id,
            option: slide.option,
            title: slide.title,
            backgroundText: slide.backgroundText,
          })
        );
        
        const info = await ViewBlockAPI.fetchSlides(slide.id);
        await dispatchMedia(info);
    });
    };

  const dispatchMedia = async (slideInfo) => {
    slideInfo.medias.forEach((media) => {
      console.log(media);
      dispatch(
        addOldMedia({
          mediaId: media.id,
          slideId: slideInfo.id,
          type: media.type,
          position: media.position,
          imageID: media.imageID,
        })
      );
    });
    console.log(mediaApp);
    
  };

  const deleteBlock = async () => {
    if(block.imageID !== ""){
      await CloudinaryAPI.destroyImage(block.imageID);
    }
    await Promise.all(block.slides.map(async (slide) => {
      const slideInfo = await ViewBlockAPI.fetchSlides(slide.id);
      await Promise.all(slideInfo.medias.map(async (media) => {
        if(media.type === "image"){
          await CloudinaryAPI.destroyImage(media.imageID);
        }
        return;
      }));
    }));
    
    await Promise.all(entries.map( async (entry) => {
      await CloudinaryAPI.destroyImage(entry.imageID);
    }));
    await ViewBlockAPI.deleteBlock(params.id);
    navigate(`/viewstudy/${block.study.id}`);
  }

  const [isModalVisible, setIsModalVisible] = useState(false)

 
  const toggleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible)
  }

  const onBackdropClick = () => {
    setIsModalVisible(false)
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
        <button className="buttonText" onClick={(e) => { downloadData(e);
          }}>Download Data</button>
      </div>
      <div>
          <h2 >Participants</h2>
            <button className="buttonText" onClick={toggleModal}>Email Text Helper</button>
            <BaseModalWrapper isModalVisible={isModalVisible} onBackdropClick={toggleModal} />
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
