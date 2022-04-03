import { configureStore } from "@reduxjs/toolkit";
import { api } from "./features/engage";
import userReducer from "./features/userSlice";
import authReducer from "./features/authSlice";
import studyReducer from "./features/studySlice";
import BlocksReducer from "./features/blocksSlice";
import { combineReducers } from "redux";
import SlidesReducer from "./features/slideSlice";
import MediaSlideReducer from "./features/mediaSlideSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

//combine study and blocks reducers
const fullStudyReducer = combineReducers({
  study: studyReducer,
  blocks: BlocksReducer,
});

const rootReducer = combineReducers({
  study: fullStudyReducer,
  slides: SlidesReducer,
  media: MediaSlideReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    //reducers
    persistedReducer,
    [api.reducerPath]: api.reducer,
    user: userReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
