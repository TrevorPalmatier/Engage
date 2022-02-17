import React, {useEffect} from "react";
import '../App.css';
import NavbarScroller from "../Components/NavbarScroller";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import { cancelled } from "../features/studySlice";
import { cancelBlocks} from "../features/blocksSlice";
import { cancelSlides } from "../features/slideSlice";
import { useAppDispatch, useAppSelector } from "../hooks/store";

/**
 * First page ** most likely after login
 * @returns home page
 */
const Home = () =>  {
  //sets up redux
  const dispatch = useAppDispatch();
  
  //hopefully cancels all persisted data
  useEffect(() => {
    dispatch(cancelled());
    dispatch(cancelSlides());
    dispatch(cancelBlocks());
  }, [])

  const navigate = useNavigate(); //sets up navigation

  const goToCreateStudy = () => {
    navigate("/createstudy");
  }

  const  goToViewStudy = () => {
    navigate("/viewstudies");
  }

  //renders home screen
  return (
    <div>
      <NavbarScroller/>
        <div className="viewHeader">
          <h1>Engage</h1>
        </div>
      <div className="container">
        <h2>Quick Links: </h2>
        <br/>
          <button  className="buttonText" onClick={goToCreateStudy} background-color="bg-dark">Create Study</button>
        <div className="divider"/>
          <button onClick={goToViewStudy} className="buttonText">View Studies</button>
        </div>
    </div>
  )
}

export default Home;