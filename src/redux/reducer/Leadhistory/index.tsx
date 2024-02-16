import { createSlice } from '@reduxjs/toolkit';
import { purchaseHistory } from '../../../../type';

const initialState: purchaseHistory = {
  purchase_history: [],
};

export const historySlice = createSlice({
  name: 'allLeads',
  initialState,
  reducers: {
    history: (state, action) => {
      state.purchase_history = action.payload;
    },
  },
});

export const { history } = historySlice.actions;
export default historySlice.reducer;
