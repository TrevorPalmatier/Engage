import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/engage";
import userReducer from "../features/user/userSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		user: userReducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
