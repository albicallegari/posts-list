import { createSlice } from '@reduxjs/toolkit';
import { LoaderState } from './loaderSlice.models';

const initialState: LoaderState = {
  visible: false,
  callStack: 0,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    // Since it can be called multiple times we keep track
    // of the number of times the loader has been called
    showLoader: ({ callStack }) => ({ visible: true, callStack: callStack + 1 }),
    hideLoader: ({ callStack: oldCallStack }) => {
      const callStack = Math.max(0, oldCallStack - 1);
      const visible = callStack > 0;
      return { visible, callStack };
    },
  },
});

export default loaderSlice;
export const { showLoader, hideLoader } = loaderSlice.actions;
