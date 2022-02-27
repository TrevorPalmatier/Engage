import React, {useEffect, useState} from 'react';
import NavbarScroller from '../Components/NavbarScroller';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import '../Styling/ViewBlocks.css';
import { useAppDispatch } from '../hooks/store';
import { addBlock } from '../features/blocksSlice';
import { setTitle } from '../features/studySlice';
import { setImage } from '../features/studySlice';

const ViewBlocks = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState<any>({});
  const [blockData, setBlockData] = useState<any>([]);

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const abortController = new AbortController();
    try{
      fetch(`https://ancient-ridge-25388.herokuapp.com/studies/${params.id}`, {signal: abortController.signal })
      .then(res => res.json())
      .then(data => {setStudy(data); setBlockData(data.blocks)})
    }catch(error){
        console.log(error);
    }
    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    }
  }, []);

  const createBlock = () =>{
    dispatch(addBlock());
    navigate(`/createblock/${study.id}`);
  }

  const goToBlock = (id) => {
    navigate(`/viewblock/${id}`);
  }

  const editStudy = () =>{
    const edit = true;
    dispatch(setTitle({title: study.title}));
    dispatch(setImage({imageLink: study.imageLink}));
    navigate(`../createstudy/${edit}/${study.id}`);
  }

  return (
    <div>
       <NavbarScroller/>
       <div className='page'>    
        <div className='pageHeader'>
          <p>Study: {study.title}</p>
          <img className='studyImage' src={study.imageLink}/>
        </div>
        <div>
          <button  className="buttonCreateBlock" onClick={editStudy}>Edit Study</button>
        </div>
        <div className='aboveGrid'>
          <button  className="buttonCreateBlock" onClick={createBlock}>Add Block</button>
          <h2 className="part">Participants</h2>
        </div>
        <div className='blockparticipantGrid'>
          <div className='blocksGrid'>
            {blockData?.map(block => {
                  return (
                    <div key= {block.id} onClick={() => goToBlock(block.id)}>
                            <img src={block.mediaURL}></img>
                            <h3 >{block.title}</h3>
                      </div>
                  )})}
          </div>
          <div className='participantList'>
            <p>person.one@hope.edu</p>
            <p>person.two@hope.edu</p>
          </div>
        </div>
       </div>
    </div>
  );
}
 
export default ViewBlocks;