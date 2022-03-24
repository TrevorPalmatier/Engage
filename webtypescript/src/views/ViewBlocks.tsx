import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.scss";
import "../Styling/ViewBlocks.scss";
import { useAppDispatch } from "../hooks/store";
import { addBlock } from "../features/blocksSlice";
import { setTitle } from "../features/studySlice";
import { setImage } from "../features/studySlice";
import { Layout } from "../Components/Layout";
import { Image } from "cloudinary-react";

const ViewBlocks = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState<any>({});
  const [blockData, setBlockData] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

      fetch(`/studies/${params.id}`, {
        signal: abortController.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          setStudy(data);
          setBlockData(data.blocks);
          setUsers(data.users);
        })
        .catch((error) => console.log(error));

    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [params.id]);

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
    dispatch(setImage({ imageLink: study.imageLink }));
    navigate(`../createstudy/${edit}/${study.id}`);
  };
  const deleteStudy = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch(`/studies/${study.id}`, {
          method: 'delete',
          headers: { 'Content-Type': 'application/json' }})

        navigate(`/viewstudies`);
        return; 
      }catch(error){
        console.error(error);
      }
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
            return (
              <p>{user.emailAddress}</p>
            )
          })}
          {
            users.length === 0 &&
            <p>no participants</p>
          }
        </div>
      </div>
    </Layout>
  );
};

export default ViewBlocks;
