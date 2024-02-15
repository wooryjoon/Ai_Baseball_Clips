import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RequestIdState {
    value: number | null;
}

const initialState: RequestIdState = { value: 0 };

export const requestIdSlice = createSlice({
    name: 'requestId',
    initialState,
    reducers: {
        setRequestId: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { setRequestId } = requestIdSlice.actions;
export default requestIdSlice.reducer;
