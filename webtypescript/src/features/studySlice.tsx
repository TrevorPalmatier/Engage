import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { stat } from "fs/promises";
import internal from "stream";
import { RootState } from "../store";


interface StudyState {
    title: string,
    imageLink: string,
    photo: string,
    submitted: boolean,
}

const initialState : StudyState = {
    title: "",
    imageLink: "",
    photo: "",
    submitted: false,
}

const studySlice = createSlice({
    name: "study",
    initialState,
    reducers: {
        setTitle: (state, {payload}) => {
            state.title = payload.title;
        },
        setImage: (state, { payload }) => {
            state.imageLink = payload.imageLink;
            // state.photo = payload.photo;
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
