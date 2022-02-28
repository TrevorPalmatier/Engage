import { configureStore } from '@reduxjs/toolkit';
import studyReducer from "./features/studySlice";
import BlocksReducer from './features/blocksSlice'; 
import { combineReducers } from 'redux';
import SlidesReducer from './features/slideSlice';
import MediaSlideReducer from './features/mediaSlideSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';

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
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: {
        //reducers
        persistedReducer
    }, 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
