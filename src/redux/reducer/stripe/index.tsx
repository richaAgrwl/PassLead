import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customer: {},
  lead_purchase_detail: [],
};

export const stripeSlice = createSlice({
  name: 'stripe',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.customer = action.payload;
    },
    lead_Purchase: (state, action) => {
      state.lead_purchase_detail = action.payload;
    },
  },
});

export const { createUser, lead_Purchase } = stripeSlice.actions;
export default stripeSlice.reducer;
