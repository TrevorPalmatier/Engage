import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface User {
	id: number;
	email: string;
}

export interface UserResponse {
	user: User;
	token: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface SignupRequest {
	email: string;
	password: string;
	repassword: string;
}
export interface EntryRequest {
	imageLink: string;
	text: string;
	userId: number;
	blockId: number;
}
export interface EntryResponse {}
export interface StudiesRequest {
	id: number;
}
export interface ArrayResponse {
	array: Array<any>;
}

export const api = createApi({
	baseQuery: fetchBaseQuery({
		// baseUrl: "https://ancient-ridge-25388.herokuapp.com/",
		baseUrl: "http://192.168.0.241:80/",
		prepareHeaders: (headers, { getState }) => {
			// By default, if we have a token in the store, let's use that for authenticated requests
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		login: builder.mutation<UserResponse, LoginRequest>({
			query: (credentials) => ({
				url: "login",
				method: "POST",
				body: credentials,
			}),
		}),
		signup: builder.mutation<UserResponse, SignupRequest>({
			query: (payload) => ({
				url: "signup",
				method: "POST",
				body: payload,
			}),
		}),
		sumbitEntry: builder.mutation<EntryResponse, EntryRequest>({
			query: (payload) => ({
				url: "entries",
				method: "POST",
				body: payload,
			}),
		}),
		protected: builder.mutation<{ message: string }, void>({
			query: () => "protected",
		}),
		studies: builder.query<ArrayResponse, number>({
			query(id) {
				return `users/studies/${id}`;
			},
		}),
		blocks: builder.query<ArrayResponse, number>({
			query(id) {
				return `studies/blocks/${id}`;
			},
		}),
		promptAndSlides: builder.query<ArrayResponse, number>({
			query(id) {
				return `blocks/slides/${id}`;
			},
		}),
		slideMedia: builder.query<ArrayResponse, number>({
			query(id) {
				return `slides/media/${id}`;
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useSignupMutation,
	useProtectedMutation,
	useSumbitEntryMutation,
	useStudiesQuery,
	useBlocksQuery,
	usePromptAndSlidesQuery,
	useSlideMediaQuery,
} = api;
