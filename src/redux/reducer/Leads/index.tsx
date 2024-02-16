import { createSlice } from '@reduxjs/toolkit';
import { LeadsState } from '../../../../type';

const initialState: LeadsState = {
  leads: {
    success: false,
    message: '',
    leads: [],
    currentPage: 0,
    totalPages: 0,
    nextPage: false,
    prevPage: false,
    totalCount: 0,
  },
  singleLead: {
    id: null,
    createdAt: null,
    updatedAt: null,
    isActive: false,
    createdBy: null,
    updatedBy: null,
    title: null,
    description: null,
    price: null,
    max_number_applicant: null,
    email: null,
    phone_number: null,
    client_location: null,
    purchase_count: null,
  },
  leadProof: '',
};

export const leadSlice = createSlice({
  name: 'allLeads',
  initialState,
  reducers: {
    leads: (state, action) => {
      state.leads = action.payload;
    },
    fetchLeadById: (state, action) => {
      state.singleLead = action.payload;
    },
    fetchLeadProofById: (state, action) => {
      state.leadProof = action.payload;
    },
  },
});

export const { leads, fetchLeadById, fetchLeadProofById } = leadSlice.actions;
export default leadSlice.reducer;
