import React, {useEffect, useState} from 'react';
import NavbarScroller from '../Components/NavbarScroller';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import '../Styling/ViewBlock.css';
import FakeScreen from './FakeScreen';
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
    const goToFakeScreen = () =>{
      navigate('/fakescreen');
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
                <h1></h1>
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