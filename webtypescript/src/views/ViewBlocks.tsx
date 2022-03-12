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

      fetch(`https://ancient-ridge-25388.herokuapp.com/studies/${params.id}`, {
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

  return (
    <Layout>
      <div className="viewHeader">
        <h1>Study: {study.title}</h1>
        <Image className="photo" cloudName='engageapp' publicId={study.imageID}/>
      </div>
      <div className="submitButtons">
        <button className="buttonText" onClick={editStudy}>
          Edit Study
        </button>
        <button className="buttonText" onClick={createBlock}>
          Add Block
        </button>
      </div>
      <div>
        <h3>Access Code: {study.code}</h3>
      </div>
      <div className="aboveGrid">
        <h2 className="part">Participants</h2>
      </div>
      <div className="blockparticipantGrid">
        <div className="blocksGrid">
          {blockData?.map((block) => {
            if (block.imgOrienation === "veritcal") {
              return (
                <div
                  className="taller"
                  key={block.id}
                  onClick={() => goToBlock(block.id)}
                >
                  <Image cloudName='engageapp' publicId={block.imageID}/>
                  <h3>{block.title}</h3>
                </div>
              );
            } else {
              return (
                <div
                  className="wider"
                  key={block.id}
                  onClick={() => goToBlock(block.id)}
                >
                  <Image cloudName='engageapp' publicId={block.imageID}/>
                  <h3>{block.title}</h3>
                </div>
              );
            }
          })}
        </div>
        <div className="participantList">
          {users.map((user) => {
            return (
              <p>{user.emailAddress}</p>
            )
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ViewBlocks;
