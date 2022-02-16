import React, {Component} from "react";
import '../App.css';
import NavbarScroller from "../Components/NavbarScroller";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";


const Home = () =>  {
  
    const navigate = useNavigate();
    const goToCreateStudy = () => {
      navigate("/createstudy");
    }

    const  goToViewStudy = () => {
      navigate("/viewstudies");
    }

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