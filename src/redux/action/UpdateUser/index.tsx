import axiosInstance from '@/redux/api/ApiConfig';
import { setLoading } from '@/redux/reducer/Loader';
import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import toast from 'react-hot-toast';
import { GetUserInfo } from '../GetUser';

const update =
  (values: {}, id: number, token: string | null, onResponse: any) =>
  async (dispatch: Dispatch) => {
    try {
      const Response = await axiosInstance.makeRequest(
        'patch',
        `update/${id}`,
        values
      );
      if (Response.status === 200) {
        dispatch(setLoading(false) as unknown as AnyAction);
        dispatch(GetUserInfo(token) as unknown as AnyAction);

        toast.success(Response.data.message);
        onResponse(false);
      }
    } catch (error: any) {
      dispatch(setLoading(false));

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

export { update };
