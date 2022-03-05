import React from 'react';
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import CreateStudy from "./views/CreateStudy";
import CreateBlock from "./views/CreateBlock";
import About from "./views/About";
import ViewStudies from "./views/ViewStudies";
import ViewBlocks from "./views/ViewBlocks";
import ViewBlock from "./views/ViewBlock";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createstudy" element={<CreateStudy />} />
          <Route path="/createstudy/:edit" element={<CreateStudy />} />
          <Route path="/createstudy/:edit/:studyid" element={<CreateStudy />} />
          <Route path="/createblock" element={<CreateBlock />} />
          <Route path="/createblock/:studyid" element={<CreateBlock />} />
          <Route
            path="/createblock/:studyid/:blockid"
            element={<CreateBlock />}
          />
          <Route path="/viewstudies" element={<ViewStudies />} />
          <Route path="/viewblocks/:id" element={<ViewBlocks />} />
          <Route path="/viewblock/:id" element={<ViewBlock />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
