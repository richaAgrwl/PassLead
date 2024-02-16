import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { registerUser } = registerSlice.actions;
export default registerSlice.reducer;
