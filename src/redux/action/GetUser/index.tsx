import axiosInstance from '@/redux/api/ApiConfig';
import { getUser } from '@/redux/reducer/Login';
import { Dispatch } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const GetUserInfo = (token: any) => async (dispatch: Dispatch) => {
  try {
    type JwtPayload = {
      id: number;
    };
    const decode = jwtDecode<JwtPayload>(token);
    const id = decode.id;
    const response = await axiosInstance.makeRequest('get', `user/${id}`);
    const result = response.data;
    if (result) {
      dispatch(getUser(result));
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

export { GetUserInfo };
