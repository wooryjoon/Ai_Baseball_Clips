import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IsUploadedState {
  isUploaded: boolean;
}

const initialState: IsUploadedState = {
  isUploaded: false,
};

export const isUploadedSlice = createSlice({
  name: 'isUploaded',
  initialState,
  reducers: {
    setIsUploaded: (state, action: PayloadAction<boolean>) => {
      state.isUploaded = action.payload;
    },
  },
});

export const { setIsUploaded } = isUploadedSlice.actions;

export default isUploadedSlice.reducer;
