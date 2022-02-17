import { createSlice } from "@reduxjs/toolkit";
import internal from "stream";
import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { setImage } from "./studySlice";

 

interface BlockState {
    id: number,
    title: string,
    imageLink: string,
    selectedImage: boolean,
    promptTitle: string,
    promptText: string,
    edit: boolean,
};

interface BlocksState extends Array<BlockState>{};

const initialState : BlocksState = []

const nextId = (blocks)  => {
    const maxId = blocks.reduce((maxId, block) => Math.max(block.id, maxId), -1)
    return maxId + 1;
}

const blocksSlice = createSlice({
    
    name: "block",
    initialState,
    reducers: {
        addBlock: (state) => {
            state = [...state, 
                {
                    id: nextId(state),
                    title: "",
                    imageLink: "",
                    selectedImage: false,
                    promptTitle: "",
                    promptText:  "",
                    edit: true,
                }
             ]
            console.log(state[0].edit);
            return state;
        },
        setBlockTitle: (state, {payload}) => {
            state.map((block) => {
                if(block.id == payload.id){
                    block.title = payload.title;
                }
            });
            return state;
        }, 
        setBlockImageLink: (state, {payload}) => {
            state.map((block) => {
                if(block.id == payload.id){
                    block.imageLink = payload.imageLink;
                    block.selectedImage = true;
                }
            });
            return state;
        },
        setBlockPromptTitle: (state, {payload}) => {
            state.map((block) => {
                if(block.id == payload.id){
                    block.promptTitle = payload.promptTitle;
                }
            });
            return state;
        },
        setBlockPromptText: (state, {payload}) => {
            state.map((block) => {
                if(block.id == payload.id){
                    block.promptText = payload.promptText;
                }
            })
            return state;
        },
        cancelled: (state, {payload}) => {
            state = state.filter((block) => block.id != payload.id);
            return state;
        },
        cancelBlocks: (state) => {
            state = initialState;
            return state;
        },
        enableDisableBlockEdit: (state, {payload}) =>{
            state.map((block) => {
                if(block.id == payload.id){
                    block.edit = payload.edit;
                }
            });
            return state;
        }
    }
});



export default blocksSlice.reducer;
export const { addBlock, setBlockTitle, setBlockPromptText, setBlockPromptTitle, setBlockImageLink, cancelBlocks, cancelled, enableDisableBlockEdit } = blocksSlice.actions;
export const selectBlock = (state: RootState) => state.persistedReducer.study.blocks.find(({edit}) => edit === true);
// export const selectSlides = (state: RootState) => { state.slides.every((slide) => slide.blockId == selectBlock)}