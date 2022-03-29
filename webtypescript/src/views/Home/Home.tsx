import React, { useEffect } from "react";
import "../../App.scss";
import { useNavigate } from "react-router-dom";
import { cancelled as cancelStudy} from "../../features/studySlice";
import { cancelBlocks} from "../../features/blocksSlice";
import { cancelSlides } from "../../features/slideSlice";
import { cancelMedia } from "../../features/mediaSlideSlice";
import { useAppDispatch } from "../../hooks/store";
import { Layout } from "../../Components/Layout";

/**
 * First page ** most likely after login
 * @returns home page
 */
const Home = () => {
  const navigate = useNavigate(); //sets up navigation
  const dispatch = useAppDispatch();
  useEffect(() => {
    const abortController = new AbortController();
    console.log("mounting");
    dispatch(cancelStudy());
    dispatch(cancelBlocks());
    dispatch(cancelMedia());
    dispatch(cancelSlides());

    return () => {
      abortController.abort();
      console.log("unmounting");
    }
  }, []);
  const goToCreateStudy = () => {
    navigate(`/createstudy`);
  };

  const goToViewStudy = () => {
    navigate("/viewstudies");
  };

  //renders home screen
  return (
    <Layout>
      <div className="viewHeader">
        <h1>Engage</h1>
      </div>
      <div className="container">
        <h2>Quick Links: </h2>
        <button className="buttonText" onClick={goToCreateStudy}>
          Create Study
        </button>
        <button onClick={goToViewStudy} className="buttonText">
          View Studies
        </button>
      </div>
    </Layout>
  );
};

export default Home;
