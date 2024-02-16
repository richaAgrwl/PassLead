import axiosInstance from '@/redux/api/ApiConfig';
import { setLoading } from '@/redux/reducer/Loader';
import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import toast from 'react-hot-toast';

//This action create for add leads
const AddNewLeads = (values: {}, anyFile: []) => async (dispatch: Dispatch) => {
  try {
    const leadResponse = await axiosInstance.makeRequest(
      'post',
      'leads/create',
      values
    );

    const id = leadResponse.data.lead.id;

    const formData = new FormData();
    Array.from(anyFile).forEach((file: File) => {
      formData.append('files', file);
    });

    const fileResponse = await axiosInstance.makeRequest(
      'post',
      `media/${id}`,
      formData,
      {
        'Content-Type': 'multipart/form-data', // Set the Content-Type header for FormData
      }
    );

    if (leadResponse.status === 201 && fileResponse.status === 201) {
      const response = await Promise.all([leadResponse, fileResponse]);
      dispatch(setLoading(false) as unknown as AnyAction);
      toast.success('Successfully added!');
    }
  } catch (error: any) {
    dispatch(setLoading(false));
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

export { AddNewLeads };
