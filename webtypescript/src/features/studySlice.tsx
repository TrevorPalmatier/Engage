import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { stat } from "fs/promises";
import internal from "stream";
import { RootState } from "../store";


interface StudyState {
    title: string,
    imageLink: string,
    selectedImage: boolean,
    submitted: boolean,
}

const initialState : StudyState = {
    title: "",
    imageLink: "",
    selectedImage: false,
    submitted: false,
}

const studySlice = createSlice({
    name: "study",
    initialState,
    reducers: {
        setTitle: (state, {payload}) => {
            state.title = payload.title;
            return state;
        },
        setImage: (state, { payload }) => {
            state.imageLink = payload.imageLink;
            state.selectedImage = true;
            return state;
        }, 
        cancelled: (state) => {
            state = initialState;
            return state;
        }
    }
});



export default studySlice.reducer;
export const { setTitle, setImage, cancelled } = studySlice.actions;
export const selectStudy = (state: RootState) => state.persistedReducer.study.study;
