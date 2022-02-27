import React, {useEffect, useState} from 'react';
import NavbarScroller from '../Components/NavbarScroller';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import '../Styling/ViewBlock.css';
import FakeScreen from './FakeScreen';
import { useAppDispatch } from '../hooks/store';
import { addOldBlock } from '../features/blocksSlice';
import { addOldSlide } from '../features/slideSlice';
import { addMedia } from '../features/mediaSlideState';
const ViewBlock = () => {
    const [block, setData] = useState<any>({});
    const params = useParams();
    
    useEffect(() => {
        const abortController = new AbortController();
    
        try{
          fetch(`https://ancient-ridge-25388.herokuapp.com/blocks/${params.id}`,  {signal: abortController.signal })
          .then(res => { return res.json()})
          .then(data => {setData(data); })
        }catch(error){
          console.log(error);
        }

    
        return () => {
          abortController.abort(); // cancel pending fetch request on component unmount
        }
    
      }, []);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const goToEditBlock = () => {
      console.log("dispatching");
      dispatch(addOldBlock({id: block.id, title: block.title, imagelink: block.mediaURL, promptTitle: block.promptTitle, promptText: block.promptText}));
      block.slides.map((slide) => {
        console.log("slide dispatch");
        dispatch(addOldSlide({blockId: block.id, slideId: slide.id, title: slide.title, backgroundText: slide.backgroundText }));
        // fetch(`https://ancient-ridge-25388.herokuapp.com/slides/${params.id}`)
        //   .then(response => response.json())
        //   .then (info => dispatch(addMedia({slideId: info.id, })))
      });
      //navigate(`/createblock/${block.studyid}/${block.id}`);
    }

    return (
     
        <div>
            <NavbarScroller/>
            <div className='page'>       
              <div className='pageHeader'>
                <p>Block: {block.title}</p>   
                <img className='blockImage' src={block.mediaURL}></img>
              </div>
              <div>
              <button onClick={goToEditBlock}> Edit Block </button>
              </div>
              <div className='organizeScreens'>
                {block.slides?.map((slide)=> {
                  return (
                    <FakeScreen key={slide.id} id = {slide.id}/>
                  )
                })}
            </div>
            </div>
        </div>
        
    );
}

export default ViewBlock;