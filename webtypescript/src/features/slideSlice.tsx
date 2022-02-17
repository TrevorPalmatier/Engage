import { createSlice } from "@reduxjs/toolkit";
import internal from "stream";
import { RootState } from "../store";
import blocksSlice from "./blocksSlice";

export interface SlideState {
    blockId: number,
    id: number,
    title: string,
    backgroundText: string
}

interface SlidesState extends Array<SlideState> {};

const initialState : SlidesState = [
]


const nextSlideId = (slides)  => {
    const maxId = slides.reduce((maxId, slide) => Math.max(slide.id, maxId), -1)
    return maxId + 1
  }

const slideSlice = createSlice({
    name: "slide",
    initialState,
    reducers: {
        addSlide: (state, {payload}) => {
            state.push({
                blockId: payload.blockId,
                id: nextSlideId(state),
                title: "",
                backgroundText:"",
            });
            return state;
        },
        setTitle: (state, {payload}) => {
            state.map((slide) => {
                if (slide.id == payload.id){
                    slide.title = payload.title;
                }
            })
            return state;
        }, 
        setText: (state, {payload}) => {
            state.map((slide) => {
                if (slide.id == payload.id){
                    slide.backgroundText = payload.text;
                }
            })
            return state;
        },
        cancelSlides: (state) => {
            state = initialState;
            return state;
        },
        cancel: (state, {payload}) => {
            state = state.filter((slide) => slide.id != payload.id);
            return state;
        }
    }
});


export default slideSlice.reducer;
export const { addSlide, setText, setTitle, cancel, cancelSlides } = slideSlice.actions;
//export const selectSlides = (state: RootState) => state.study.block.slides;