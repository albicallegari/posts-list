import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clone } from 'ramda';
import { DialogState } from './dialogSlice.models';

const initialState: DialogState = {
  open: false,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    showDialog: (state) => ({
      ...state,
      open: true,
    }),
    hideDialog: () => clone(initialState),
  },
});

export default dialogSlice;
export const { hideDialog, showDialog } = dialogSlice.actions;
