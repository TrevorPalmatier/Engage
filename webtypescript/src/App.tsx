import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import CreateStudy from "./views/CreateStudy/CreateStudy";
import CreateBlock from "./views/CreateBlock/CreateBlock";
import About from "./views/About/About";
import ViewStudies from "./views/ViewStudies/ViewStudies";
import viewstudy from "./views/ViewStudy/ViewStudy";
import ViewBlock from "./views/ViewBlock/ViewBlock";
import EditBlock from "./views/EditBlock/EditBlock";
import ViewStudy from "./views/ViewStudy/ViewStudy";
import Login from "./views/Login/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createstudy" element={<CreateStudy />} />
          <Route path="/createstudy/:edit" element={<CreateStudy />} />
          <Route path="/createstudy/:edit/:studyid" element={<CreateStudy />} />
          <Route path="/createblock" element={<CreateBlock />} />
          <Route path="/createblock/:studyid" element={<CreateBlock />} />
          <Route path="/editblock/:studyid/:blockid" element={<EditBlock />} />
          <Route path="/viewstudies" element={<ViewStudies />} />
          <Route path="/viewstudy/:id" element={<ViewStudy />} />
          <Route path="/viewblock/:id" element={<ViewBlock />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
