import axiosInstance from '@/redux/api/ApiConfig';
import { setLoading } from '@/redux/reducer/Loader';
import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import toast from 'react-hot-toast';

const sendEmail =
  (email: string, onResponse: any) => async (dispatch: Dispatch) => {
    try {
      const EmailResponse = await axiosInstance.makeRequest(
        'post',
        'forgot-password',
        email,
        {
          'content-type': 'application/json',
        }
      );

      if (EmailResponse.status === 200) {
        dispatch(setLoading(false) as unknown as AnyAction);
        toast.success(EmailResponse.data.message);
        onResponse(true);
      }
    } catch (error: any) {
      dispatch(setLoading(false));
      onResponse(false);
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
        toast.error('Network error:', error.message);
      } else {
        // Handle other errors (e.g., request configuration issues)
        toast.error('An error occurred:', error.message);
      }
    }
  };

export { sendEmail };
