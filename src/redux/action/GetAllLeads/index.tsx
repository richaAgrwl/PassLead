import axiosInstance from '@/redux/api/ApiConfig';
import { leads } from '@/redux/reducer/Leads';
import { Dispatch } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const GetAllLeads =
  (query: string, page: number, limit: number) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.makeRequest(
        'get',
        `leads/list?limit=${limit}&page=${page}&search=${query}`
      );
      const result = response.data;
      if (result) {
        // Dispatch the leads and other pagination-related data
        dispatch(leads(result));
      }
    } catch (error: any) {
      if (error.response) {
        // Handle errors related to the HTTP response (e.g., 4xx and 5xx errors)
        console.error(
          'HTTP error:',
          error.response.status,
          error.response.data
        );
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

export { GetAllLeads };
