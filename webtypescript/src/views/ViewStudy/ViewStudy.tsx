import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../App.scss";
import "./ViewStudy.scss";
import { useAppDispatch } from "../../hooks/store";
import { addBlock } from "../../features/blocksSlice";
import { setOriginalImage, setTitle } from "../../features/studySlice";
import { setImage } from "../../features/studySlice";
import { Layout } from "../../Components/Layout";
import { Image } from "cloudinary-react";
import * as StudyAPI from "./ViewStudyAPI";
import * as CloudinaryAPI from "../../SharedAPI/CloudinaryAPI";

const ViewStudy = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState<any>({});
  const [blockData, setBlockData] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [incompleteUsers, setIncompleteUsers] = useState([""]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

      fetch(`/studies/${params.id}`, {
        signal: abortController.signal,
      })
        .then((res) => res.json())
        .then(async (data) => {
          setStudy(data);
          setBlockData(data.blocks);
          setUsers(data.users);
          await organizeUsers(data.blocks, data.users);
        })
        .catch((error) => console.log(error));

    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [params.id]);

  const organizeUsers = async (blocks,  users) => {
    let usersIncomplete = await users;
    await blocks.forEach(async (block) => {
      const entries = await StudyAPI.fetchEntries(block.id);
      let usersEntry = new Array<number>();
      await entries.forEach((entry) => {
        console.log(entry);
        usersEntry.push(entry.userId);
      })
      usersEntry.forEach((id) =>{
        usersIncomplete = usersIncomplete.filter((user) => user.id !== id)
      })
      console.log(usersEntry);
    })

    let emails = new Array<string> ();
    await usersIncomplete.forEach((user) => {
      emails.push(user.emailAddress);
    })
    setIncompleteUsers(emails);
  }

  const createBlock = () => {
    dispatch(addBlock());
    navigate(`/createblock/${study.id}`);
  };

  const goToBlock = (id) => {
    navigate(`/viewblock/${id}`);
  };

  const editStudy = () => {
    const edit = true;
    dispatch(setTitle({ title: study.title }));
    dispatch(setOriginalImage({ imageID: study.imageID }));
    navigate(`../createstudy/${edit}/${study.id}`);
  };

  const deleteStudy = async (e) => {
    e.preventDefault();

    //destroy images in cloudinary that are associated with the study
    await CloudinaryAPI.destroyImage(study.imageID);

    await blockData.forEach(async (block) => {
      const entries = await StudyAPI.fetchEntries(block.id);
      await entries.forEach( async (entry) => {
        await CloudinaryAPI.destroyImage(entry.imageID);
      });
      const slides = await StudyAPI.fetchSlides(block.id);
      await slides.forEach(async (slide) => {
        const medias = await StudyAPI.fetchMedia(slide.id);
        await medias.forEach(async (media) => {
          await CloudinaryAPI.destroyImage(media.imageID);
        })
      })
    })
    
    await StudyAPI.deleteOneStudy(study.id);

    navigate(`/viewstudies`);   
  }
  
  return (
    <Layout>
      <div className="viewHeader">
        <h1>Study: {study.title}</h1>
        <Image className="blockImage" cloudName='engageapp' publicId={study.imageID}/>
      </div>
      <div className="submitButtons">
        <button className="buttonText" onClick={editStudy}>
          Edit Study
        </button>
        <button className="buttonText" onClick={createBlock}>
          Add Block
        </button>
        <button className="buttonText" onClick={(e) => {
          const confirmBox = window.confirm("Participants will not longer be able to view this study. \n Are you sure you want to delete this Study?")
          if(confirmBox === true){
            deleteStudy(e);
          }
        }}>Delete Study</button>
      </div>
      <div>
        <h3>Access Code: {study.code}</h3>
      </div>
      <div className="aboveGrid">
        <div>
        <h2>Blocks</h2>
        </div>
        <div>
          <h2 >Participants</h2>
        </div> 
      </div>
      <div className="blockparticipantGrid">
        <div className="blocks-container">
          {blockData?.map((block) => {
              return (
                <div
                  className="square"
                  key={block.id}
                  onClick={() => goToBlock(block.id)}
                >
                  <Image cloudName='engageapp' publicId={block.imageID}/>
                  <h2>{block.title}</h2>
                </div>
              );
          })}
        </div>
        <div className="participantList">
          {users?.map((user) => {
            if(incompleteUsers.includes(user.emailAddress)){
              console.log("incomplete");
              return(
                <div id={user.id}>
                  <input type="checkbox"  id={user.id} checked={false}/>
                  <label>{user.emailAddress}</label>
                </div>
              )
            }else{
              console.log(user.emailAddress);
              return (
                <div id={user.id}>
                    <input type="checkbox" disabled checked={true} id={user.id}/>
                    <label>{user.emailAddress}</label>
                  </div>
              )}
            })}
        </div>
      </div>
    </Layout>
  );
};

export default ViewStudy;
