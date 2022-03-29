import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface StudyState {
  title: string;
  imageID: string;
  selectedImage: boolean;
  submitted: boolean;
  originalImage: string
}

const initialState: StudyState = {
  title: "",
  imageID: "",
  selectedImage: false,
  submitted: false,
  originalImage: ""
};

const studySlice = createSlice({
  name: "study",
  initialState,
  reducers: {
    setTitle: (state, { payload }) => {
      state.title = payload.title;
      return state;
    },
    setOriginalImage: (state, {payload}) =>{
      state.originalImage = payload.imageID;
      state.imageID = payload.imageID;
      state.selectedImage = true;
      return state;
    },
    setImage: (state, { payload }) => {
      state.imageID = payload.imageID;
      state.selectedImage = true;
      return state;
    },
    cancelled: (state) => {
      state = initialState;
      return state;
    },
  },
});

export default studySlice.reducer;
export const { setTitle, setOriginalImage, setImage, cancelled } = studySlice.actions;
export const selectStudy = (state: RootState) =>
  state.persistedReducer.study.study;
