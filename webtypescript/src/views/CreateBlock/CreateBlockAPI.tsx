import React from 'react';

//gets information from the study that is adding a block too
const getStudyInfo = async (studyID: string) => {
    const response = await fetch(
        `/studies/${studyID}`
    );
    
    return await response.json();
}

//posts block info 
const postBlock = async ( blockData ) => {
    try{
        const response = await fetch("/blocks", {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blockData)
        })

        return await response.json();

    }catch(err){
        console.error(err);
    }
}

//post slide
const postSlide = async ( slideData ) => {
    try{
        const response = await fetch(`/slides`, {
            method: 'post', 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slideData)
        });

        return await response.json();
    }catch(err){
        console.error(err);
    }
}

//post slide media
const postSlideMedia = async ( mediaData ) => {
    try{
        const response = await fetch('/slidemedia', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mediaData)
        });
    }catch(err){
        console.error(err);
    }
}


export { getStudyInfo, postBlock, postSlide, postSlideMedia };