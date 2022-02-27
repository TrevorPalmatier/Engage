import React, {useEffect, useState} from 'react';
import NavbarScroller from '../Components/NavbarScroller';
import '../App.css';
import '../Styling/ViewStudies.css';
import CreateStudy from './CreateStudy';
import { useNavigate } from 'react-router-dom';
 
  
const ViewStudies = () => {
  const [data, setData] = useState<any>([]);
  const [photo, setPhoto] = useState("");

   useEffect( () => {
    const abortController = new AbortController();

    fetch("https://ancient-ridge-25388.herokuapp.com/studies",  {signal: abortController.signal })
    .then(res => { return res.json()})
    .then(data => {setData(data)})
    .catch(error=> {console.log(error)});
    

    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    }
  }, []);
  
  const navigate = useNavigate(); //sets up navigation

  const goToCreateStudy = () => {
    navigate("/createstudy");
  }

  const gotToBlocks = (id) => {
    console.log(id);
    navigate(`/viewblocks/${id}`);
  }
    return (
     <div> 
        <NavbarScroller/>
        <div className='page'>
          <div className='pageHeader'>
            <p>Studies</p>
          </div>
          <div className='addPadding'>
            <button  className="buttonCreateStudy" onClick={goToCreateStudy} background-color="bg-dark">Create Study</button>
          </div>
          <div className='studiesGrid'>
              {data.map(study =>{
              return (
                <div key= {study.id}  onClick={() => gotToBlocks(study.id)}>
                        <img className='gridPhoto' src={study.imageLink}></img>
                        <h3 >{study.title}</h3>
                  </div>
              )})}
          </div>
        </div>
    </div>
    )
}
 export default ViewStudies;