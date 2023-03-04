import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../common/common.models";
import { PostsState } from "./postsSlice.models";

const initialState: PostsState = {
  numOfPosts: 0,
  postsList: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setNumOfPosts: (state: PostsState, action: PayloadAction<number>) => ({
      ...state,
      numOfPosts: action.payload,
    }),
    setPosts: (state: PostsState, action: PayloadAction<Post[]>) => ({
      ...state,
      postsList: action.payload,
    }),
  },
});

export default postsSlice;
export const { setNumOfPosts, setPosts } = postsSlice.actions;
