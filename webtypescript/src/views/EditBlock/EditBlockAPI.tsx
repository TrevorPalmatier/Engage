import * as CreateBlockAPI from "../CreateBlock/CreateBlockAPI";
import * as CloudinaryAPI from "../../SharedAPI/CloudinaryAPI";

const updateBlock = async (blockID, blockData) => {
    try{
        const response = await fetch(
            `/blocks/${blockID}`,{
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blockData)
            }
        );

        return await response.json();
    }catch(err){
        console.error(err);
    }
}


const postSlide = async(slideData) => {
    return await CreateBlockAPI.postSlide(slideData);
}

const updateSlide = async (slideID, slideData) => {
    try{
        const response = await fetch( `/slides/${slideID}`, {
            method: 'put', 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slideData)
        });

        return await response.json();
    }catch(err){
        console.error(err);
    }
}

const postSlideMedia = async (mediaData) => {
    return await CreateBlockAPI.postSlideMedia(mediaData);
}

const updateSlideMedia = async (mediaID, mediaData) => {
    try{
        await fetch( `/slidemedia/${mediaID}`,{
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mediaData),
        });
    }catch(err){
        console.error(err);
    }
}

const deleteSlide = async (slideID) => {
    try{
        const response = await fetch(`/slides/${slideID}`);
        const slideData = await response.json();

        await slideData.medias.forEach(async (media) => {
            await deleteMedia(media);
        });

        await fetch(`/slides/${slideID}`, {
            method: 'delete',
            headers: { "Content-Type": "application/json" }
        });
    }catch(err){
        console.error(err);
    };

}

const deleteMedia = async(media) => {
    try{
        await CloudinaryAPI.destroyImage(media.imageID);
        await fetch(`/slidemedia/${media.id}`,{
            method: 'delete',
            headers: { "Content-Type": "application/json" }
        });
    }catch(err){
        console.error(err);
    }
}

export { updateBlock, deleteMedia, postSlide, updateSlide, updateSlideMedia, postSlideMedia,
deleteSlide };