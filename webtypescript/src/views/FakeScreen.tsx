import React, {useEffect, useState} from 'react';
import NavbarScroller from '../Components/NavbarScroller';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import '../Styling/FakeScreen.css';
/**
 * this is to show a fake screen for each slide of a block
 */
const FakeScreen = ({id}) => {
    const [slideData, setData] = useState<any>({});

    useEffect(() => {
        fetch(`https://ancient-ridge-25388.herokuapp.com/slides/${id}`)
        .then(response => response.json())
        .then(data => {setData(data);});
        console.log(slideData);
    }, [])

    return (
        <div>
            <div className='smartphone'>
                <div className='content'>
                    <h2>{slideData.title}</h2>
                    <img className='slideImage' src="https://th-thumbnailer.cdn-si-edu.com/4Nq8HbTKgX6djk07DqHqRsRuFq0=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/d5/24/d5243019-e0fc-4b3c-8cdb-48e22f38bff2/istock-183380744.jpg"/>
                    <p>{slideData.backgroundText}.</p>
                </div>
            </div>
        </div>
    )

}

export default FakeScreen;
