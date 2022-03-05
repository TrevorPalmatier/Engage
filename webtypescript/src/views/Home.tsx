import React, { useEffect } from "react";
import "../App.scss";
import { useNavigate } from "react-router-dom";
import { cancelled } from "../features/studySlice";
import { cancelBlocks } from "../features/blocksSlice";
import { cancelSlides } from "../features/slideSlice";
import { useAppDispatch } from "../hooks/store";
import { cancelMedia } from "../features/mediaSlideSlice";
import { Layout } from "../Components/Layout";

/**
 * First page ** most likely after login
 * @returns home page
 */
const Home = () => {
  //sets up redux
  const dispatch = useAppDispatch();

  //hopefully cancels all persisted data
  useEffect(() => {
    dispatch(cancelled());
    dispatch(cancelSlides());
    dispatch(cancelBlocks());
    dispatch(cancelMedia());
  }, [dispatch]);

  const navigate = useNavigate(); //sets up navigation

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
