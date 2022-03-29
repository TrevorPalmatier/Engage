import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface BlockState {
  id: number;
  title: string;
  imageID: string;
  selectedImage: boolean;
  promptTitle: string;
  promptText: string;
  edit: boolean;
  new: boolean;
  originalImage: string;
}

interface BlocksState extends Array<BlockState> {}

const initialState: BlocksState = [];

const nextId = (blocks) => {
  const maxId = blocks.reduce((maxId, block) => Math.max(block.id, maxId), -1);
  return maxId + 1;
};

const blocksSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    addBlock: (state) => {
      state = [
        ...state,
        {
          id: nextId(state),
          title: "",
          imageID: "",
          selectedImage: false,
          promptTitle: "",
          promptText: "",
          edit: true,
          new: true,
          originalImage: ""
        },
      ];
      return state;
    },
    changeToEditBlock: (state, {payload}) => {

    },
    addOldBlock: (state, { payload }) => {
      state = [
        ...state,
        {
          id: payload.id,
          title: payload.title,
          imageID: payload.imageID,
          selectedImage: true,
          promptTitle: payload.promptTitle,
          promptText: payload.promptText,
          edit: true,
          new: false,
          originalImage: payload.imageID
        },
      ];
      return state;
    },
    setBlockTitle: (state, { payload }) => {
      state.forEach((block) => {
        if (block.id === payload.id) {
          block.title = payload.title;
        }
      });
      return state;
    },
    setBlockImageLink: (state, { payload }) => {
      state.forEach((block) => {
        if (block.id === payload.id) {
          block.imageID = payload.imageID;
          block.selectedImage = true;
        }
      });
      return state;
    },
    setBlockPromptTitle: (state, { payload }) => {
      state.forEach((block) => {
        if (block.id === payload.id) {
          block.promptTitle = payload.promptTitle;
        }
      });
      return state;
    },
    setBlockPromptText: (state, { payload }) => {
      state.forEach((block) => {
        if (block.id === payload.id) {
          block.promptText = payload.promptText;
        }
      });
      return state;
    },
    cancelled: (state, { payload }) => {
      state = state.filter((block) => block.id !== payload.id);
      return state;
    },
    cancelBlocks: (state) => {
      state = initialState;
      return state;
    },
    enableDisableBlockEdit: (state, { payload }) => {
      state.forEach((block) => {
        if (block.id === payload.id) {
          block.edit = payload.edit;
        }
      });
      return state;
    },
  },
});

export default blocksSlice.reducer;
export const {
  addBlock,
  addOldBlock,
  setBlockTitle,
  setBlockPromptText,
  setBlockPromptTitle,
  setBlockImageLink,
  cancelBlocks,
  cancelled,
  enableDisableBlockEdit,
} = blocksSlice.actions;
export const selectBlock = (state: RootState) =>
  state.persistedReducer.study.blocks.find(({ edit }) => edit === true);
// export const selectSlides = (state: RootState) => { state.slides.every((slide) => slide.blockId == selectBlock)}
