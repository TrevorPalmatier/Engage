import { createSlice } from "@reduxjs/toolkit";

export interface MediaState {
    id: number,
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
                slideId: payload.slideId,
                type: payload.type,
                url: payload.url,
            })
            return state;
        },
        deleteOneMedia: (state, {payload}) => {
            state = state.filter((media1) => media1.id != payload.id);
            return state;
        },
        cancelMedia: (state) => {
            state = initialState;
            return state;
        }
    }
});

export default mediaSlideSlice.reducer;
export const {addMedia, deleteOneMedia, cancelMedia} = mediaSlideSlice.actions;