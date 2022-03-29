import React from "react";
import { json } from "stream/consumers";

const deleteOneStudy = async (studyId) => {
    try{
        await fetch(`/studies/${studyId}`, {
            method: 'delete', 
            headers: { 'Content-Type': 'application/json' }
        })
    }catch(err){
        console.error(err);
    }
}

const fetchSlides= async (blockId) => {
    try{
        const response = await fetch(`/blocks/${blockId}`);
        const blockInfo = await response.json();

        return await blockInfo.slides;
    }catch(err){
        console.error(err);
    }
}

const fetchMedia = async (slideID) => {
    try{
        const response = await fetch(`/slides/${slideID}`);
        const slideInfo = await response.json();

        return await slideInfo.medias;
    }catch(err){
        console.error(err);
    }
}

const fetchEntries = async (blockID) => {
    try{
        const response = await fetch(`/blocks/entries/${blockID}`);
        const blockInfo = await response.json();

        return await blockInfo.entries;
    }catch(err){
        console.error(err);
    }
}
export {deleteOneStudy, fetchSlides, fetchMedia, fetchEntries};