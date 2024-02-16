import axiosInstance from '@/redux/api/ApiConfig';
import { history } from '@/redux/reducer/Leadhistory';
import { Dispatch } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const GetPurchaseHistory = (id: number) => async (dispatch: Dispatch) => {
  try {
    const response = await axiosInstance.makeRequest(
      'get',
      `lead-purchse/history/${id}`
    );
    const result = response.data.purchaseHistory;
    if (result) {
      dispatch(history(result));
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

export { GetPurchaseHistory };
