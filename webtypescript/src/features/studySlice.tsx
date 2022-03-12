import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface StudyState {
  title: string;
  imageID: string;
  imgOrientation: string;
  selectedImage: boolean;
  submitted: boolean;
}

const initialState: StudyState = {
  title: "",
  imageID: "",
  imgOrientation: "",
  selectedImage: false,
  submitted: false,
};

const studySlice = createSlice({
  name: "study",
  initialState,
  reducers: {
    setTitle: (state, { payload }) => {
      state.title = payload.title;
      return state;
    },
    setImage: (state, { payload }) => {
      state.imageID = payload.imageID;
      state.imgOrientation = payload.imgOrientation;
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
export const { setTitle, setImage, cancelled } = studySlice.actions;
export const selectStudy = (state: RootState) =>
  state.persistedReducer.study.study;
