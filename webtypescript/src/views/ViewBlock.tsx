import React, {useEffect, useState} from 'react';
import NavbarScroller from '../Components/NavbarScroller';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.scss';
import '../Styling/ViewBlock.css';
import FakeScreen from './FakeScreen';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { addOldBlock, cancelBlocks } from '../features/blocksSlice';
import { addOldSlide, cancelSlides } from '../features/slideSlice';
import { addMedia, addOldMedia, cancelMedia } from '../features/mediaSlideSlice';
const ViewBlock = () => {
    const [block, setData] = useState<any>({});
    const [entries, setEntries] = useState<any>([]);

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(cancelMedia());
        dispatch(cancelBlocks());
        dispatch(cancelSlides());
        const abortController = new AbortController();
    
        try{
          fetch(`https://ancient-ridge-25388.herokuapp.com/blocks/${params.id}`,  {signal: abortController.signal })
          .then(res => { return res.json()})
          .then(data => {setData(data) })

          fetch(`https://ancient-ridge-25388.herokuapp.com/blocks/entries/${params.id}`, {signal: abortController.signal })
          .then(res => res.json())
          .then(data => {console.log(data); setEntries(data.entries)})
        }catch(error){
          console.log(error);
        }

    
        return () => {
          abortController.abort(); // cancel pending fetch request on component unmount
        }
    
      }, []);

  
    const goToEditBlock = async (e) => {
      e.preventDefault();

      dispatch(addOldBlock({id: block.id, title: block.title, imagelink: block.mediaURL, promptTitle: block.promptTitle, promptText: block.promptText}));
      block.slides.map((slide) => {
        dispatch(addOldSlide({id: slide.id, blockId: block.id, slideId: slide.id, title: slide.title, backgroundText: slide.backgroundText }));
        fetch(`https://ancient-ridge-25388.herokuapp.com/slides/${slide.id}`)
          .then(response => response.json())
          .then (info => {dispatchMedia(slide.id, info)})
      })

       navigate(`/createblock/${block.study.id}/${block.id}`);
    }

    const dispatchMedia = (slideId, slideInfo) => {
      console.log(slideInfo);
        slideInfo.medias.map((media)=>{
          dispatch(addOldMedia({slideId: slideInfo.id, mediaId: media.id, type: media.type, url: media.mediaUrl}));
        })
        
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
                <h2>Prompt Title: {block.promptTitle}</h2>
                <p>Prompt Text: {block.promptText}</p>
              </div>
              <div>
              <button onClick={e => {goToEditBlock(e)}}> Edit Block </button>
              </div>
              <br/>
              <div className = 'maincomponent'>
                <div className='organizeScreens'>
                  {block.slides?.map((slide)=> {
                    return (
                      <div>
                      <FakeScreen key={slide.id} id = {slide.id}/>
                      </div>
                    )
                  })}
                </div>
                {/* <div className ='entriesGrid'>
                  {entries?.map((entry) => {
                    return(
                      <div key = {entry.id}>
                        <img src={entry.imageLink}/>
                        <h3 >{entry.description}</h3>
                      </div>
                    )
                  })
                  }
                </div> */}
              </div>
            </div>
        </div>
        
    );
}

export default ViewBlock;