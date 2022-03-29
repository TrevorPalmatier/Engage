import React from "react";

const fetchSlides = async (slideID) => {
 try{
     const response = await fetch(`/slides/${slideID}`);

     return await response.json();
 }catch(err){
     console.error(err);
 }
}

const deleteBlock = async (blockID) => 
{
    try{
        const response = await fetch(`/blocks/${blockID}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' } 
        });
    }catch(err){
        console.error(err);
    }
}

export { fetchSlides, deleteBlock }