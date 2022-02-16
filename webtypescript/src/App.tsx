import  { useState } from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home  from './views/Home';
import CreateStudy from './views/CreateStudy';
import CreateBlock from './views/CreateBlock';
import About from './views/About';
import ViewStudies from './views/ViewStudies';
import ViewBlocks from './views/ViewBlocks';
import CreateSlide from './views/CreateSlide';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path = "/createstudy" element ={<CreateStudy/>}/>
          <Route path = "/createblock" element ={<CreateBlock/>}/>
          <Route path = "/createblock/:id" element = {<CreateBlock/>}/>
          <Route path = "/viewstudies" element ={<ViewStudies/>}/>
          <Route path = "/viewblocks" element ={<ViewBlocks/>}/>
          {/* <Route path = "/createslide" element = {<CreateSlide/>}/> */}
          <Route path = "/about" element ={<About/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
