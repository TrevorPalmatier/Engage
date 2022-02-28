import React, {useEffect, useState} from 'react';
import NavbarScroller from '../Components/NavbarScroller';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.scss';
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

    console.log(slideData.medias);
    return (
        <div>
            <div className='smartphone'>
                <div className='content'>
                    <h2>{slideData.title}</h2>
                    {
                        slideData.medias?.map((media) => {
                            return (
                                <div key={media.id}>
                                    <img className='slideImage' src={media.mediaUrl}/>
                                </div>
                            )
                        } )
                    }
                    
                    <p>{slideData.backgroundText}.</p>
                </div>
            </div>
        </div>
    )

}

export default FakeScreen;
