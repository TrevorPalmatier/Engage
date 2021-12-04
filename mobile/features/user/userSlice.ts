import { createSlice } from "@reduxjs/toolkit";

interface UserState {
	name: string;
	token: string;
}

const initialState: UserState = {
	name: null,
	token: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setName(state, action) {
			state.name = action.payload.name;
		},
		setToken(state, action) {
			state.token = action.payload.token;
		},
	},
});

export const { setName, setToken } = userSlice.actions;
export default userSlice.reducer;
