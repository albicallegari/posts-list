import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dialogSlice from "./store/dialogSlice/dialogSlice";
import loaderSlice from "./store/loaderSlice/loaderSlice";
import postsSlice from "./store/postsSlice/postsSlice";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  loader: loaderSlice.reducer,
  posts: postsSlice.reducer,
  dialog: dialogSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
