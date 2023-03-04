import { Post } from "../../common/common.models";

export interface PostsState {
    numOfPosts: number;
    postsList: Post[];
  }