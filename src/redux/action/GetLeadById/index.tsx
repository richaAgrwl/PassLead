import axiosInstance from '@/redux/api/ApiConfig';
import { fetchLeadById, fetchLeadProofById } from '@/redux/reducer/Leads';
import { Dispatch } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const GetLeadById = (param: any) => async (dispatch: Dispatch) => {
  try {
    const response = await axiosInstance.makeRequest(
      'get',
      `leads/data/${param}`
    );
    const result = response.data;
    if (result) {
      // Dispatch the leads and other pagination-related data
      dispatch(fetchLeadById(result));
    }
  } catch (error: any) {
    if (error.response) {
      // Handle errors related to the HTTP response (e.g., 4xx and 5xx errors)
      console.error('HTTP error:', error.response.status, error.response.data);
      toast.error(error.response.data.message);
    } else if (error.request) {
      // Handle request-related errors (e.g., no response received)
      console.error('Network error:', error.message);
    } else {
      // Handle other errors (e.g., request configuration issues)
      console.error('An error occurred:', error.message);
    }
  }
};

const GetLeadProofById = (param: any) => async (dispatch: Dispatch) => {
  try {
    var data = JSON.stringify({
      leadId: '9',
    });
    const response = await axiosInstance.makeRequest('get', `proof/${param}`);
    const result = response.data;
    if (result) {
      // Dispatch the leads and other pagination-related data
      dispatch(fetchLeadProofById(result));
    }
  } catch (error: any) {
    if (error.response) {
      // Handle errors related to the HTTP response (e.g., 4xx and 5xx errors)
      console.error('HTTP error:', error.response.status, error.response.data);
      toast.error(error.response.data.message);
    } else if (error.request) {
      // Handle request-related errors (e.g., no response received)
      console.error('Network error:', error.message);
    } else {
      // Handle other errors (e.g., request configuration issues)
      console.error('An error occurred:', error.message);
    }
  }
};

export { GetLeadById, GetLeadProofById };
