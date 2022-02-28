import { createSlice } from "@reduxjs/toolkit";

export interface MediaState {
    id: number,
    mediaId: number,
    slideId: number,
    type: string,
    url: string
} 

interface MediaSlideState extends Array<MediaState>{};

const initialState : MediaSlideState = []

const nextMediId = (media) => {
    const maxId = media.reduce((maxId, media1) => Math.max(media1.id, maxId), -1)
    return maxId + 1;
}

const mediaSlideSlice = createSlice({
    name: "media",
    initialState,
    reducers: {
        addMedia: (state, {payload}) => {
            state.push({
                id: nextMediId(state),
                mediaId: -1,
                slideId: payload.slideId,
                type: payload.type,
                url: payload.url,
            })
            return state;
        },
        addOldMedia: (state, {payload}) => {
            state.push({
                id: nextMediId(state),
                mediaId: payload.mediaId,
                slideId: payload.slideId,
                type: payload.type,
                url: payload.url,
            })
        },
        deleteOneMedia: (state, {payload}) => {
            state = state.filter((media1) => media1.id != payload.id);
            return state;
        },
        cancelMedia: (state) => {
            state = initialState;
            return state;
        },
        cancelBySlide: (state, {payload}) => {
            state = state.filter((media) => media.slideId = payload.slideId);
            return state;
        } 
    }
});

export default mediaSlideSlice.reducer;
export const {addMedia, addOldMedia, deleteOneMedia, cancelMedia, cancelBySlide} = mediaSlideSlice.actions;