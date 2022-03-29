import React from "react";

const updateStudy = async (studyID, studyData) => {
    try{
        await fetch(
            `/studies/${studyID}`,
            {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studyData),
            }
        );
    }catch(err){
        console.error(err);
    }
}

const postStudy = async (studyData) => {
    try{
        const response = await fetch("/studies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studyData)
        });
        return await response.json();
    }catch(err){
        console.error(err);
    }
}

const postBlock = async ( blockData ) => {
    try{
        const response = await fetch("/blocks", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blockData)
        })

        return await response.json();
    }catch(err){
        console.error(err);
    }
}

const postSlide = async ( slideData ) => {
    try{
        const response = await fetch(
            "/slides",{
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(slideData)
            }
        );

        return await response.json();
    }catch(err){
        console.error(err);
    }
}

const postSlideMedia = async ( mediaData ) => {
    try{
        const response = await fetch(
            "/slidemedia", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mediaData)
            }
        )
    }catch(err){
        console.error(err);
    }
}

export { updateStudy, postStudy, postBlock, postSlide, postSlideMedia };