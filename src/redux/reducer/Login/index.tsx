import { createSlice } from '@reduxjs/toolkit';
import { userInfo } from '../../../../type';
interface MyState {
  user_info: {
    token: string | null;
    cus_id: string | null;
  };
  user: Record<string, any>;
  // Add more properties as needed
}
const initialState: MyState = {
  user_info: {
    token: null,
    cus_id: null,
  },
  user: {},
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user_info.token = action.payload.token;
      state.user_info.cus_id = action.payload.cus_id;
    },
    getUser: (state, action) => {
      state.user = action.payload;
    },
    reset: () => initialState,
  },
});

export const { loginUser, getUser, reset } = loginSlice.actions;
export default loginSlice.reducer;
