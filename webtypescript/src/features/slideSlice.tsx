import { createSlice } from "@reduxjs/toolkit";
import internal from "stream";
import { isConstructorDeclaration } from "typescript";
import { RootState } from "../store";
import blocksSlice from "./blocksSlice";

export interface SlideState {
    blockId: number,
    id: number,
    slideId: number,
    title: string,
    backgroundText: string,
    option: number,
    new: boolean

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
                slideId: 0,
                title: "",
                backgroundText:"",
                option: 1,
                new: true
            });
            return state;
        }, addOldSlide: (state, {payload}) => {
            state.push({
                blockId: payload.blockId,
                id: payload.id,
                slideId: payload.slideId,
                title: payload.title,
                backgroundText: payload.backgroundText,
                option: payload.option,
                new: false
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
        setSlideOption: (state, {payload}) =>{
            state.map((slide) => {
                if(slide.id == payload.id){
                    slide.option = payload.option;
                }
            })
        },
        cancelSlides: (state) => {
            state = initialState;
            return state;
        },
        cancel: (state, {payload}) => {
            state = state.filter((slide) => slide.id != payload.id);
            return state;
        },
        cancelByBlock: (state, {payload}) =>{
            state = state.filter((slide)=> slide.blockId != payload.blockId);
            return state;
        }
    }
});


export default slideSlice.reducer;
export const { addSlide, addOldSlide, setText, setTitle, setSlideOption, cancel, cancelSlides, cancelByBlock } = slideSlice.actions;
//export const selectSlides = (state: RootState) => state.study.block.slides;