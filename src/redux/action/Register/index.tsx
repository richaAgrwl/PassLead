import axiosInstance from '@/redux/api/ApiConfig';
import { setLoading } from '@/redux/reducer/Loader';
import { loginUser } from '@/redux/reducer/Login';
import { registerUser } from '@/redux/reducer/Register';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../../../type';
import { NextRouter } from 'next/router';
import { GetUserInfo } from '../GetUser';

//This action create for User Register

const RegisterUser =
  (values: {}, router: NextRouter) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.makeRequest(
        'post',
        'register',
        values
      );
      const result = response.data;
      if (result) {
        dispatch(registerUser(result.user));
        dispatch(setLoading(false));
        toast.success('Successfully registered!');
        router.push('/login');
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

const Login =
  (values: {}, router: NextRouter) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.makeRequest(
        'post',
        'signin',
        values
      );
      const result = response.data;
      const token = result.token;
      const decode = jwtDecode<JwtPayload>(token);
      const cus_id = decode.customer_id;

      const decode_value = { token, cus_id };
      if (result) {
        dispatch(loginUser(decode_value));
        dispatch(GetUserInfo(token) as unknown as AnyAction);

        toast.success('Successfully login!');

        setTimeout(() => {
          dispatch(setLoading(false));
          router.push('/all-leads');
        }, 1000);
      }
    } catch (error: any) {
      dispatch(setLoading(false));

      if (error.response) {
        if (error.response.status === 500) {
          // Unauthorized - Incorrect credentials
          console.error(
            'Invalid credentials. Please check your username and password.'
          );
          toast.error('Invalid credentials');
        } else if (error.response.status === 403) {
          // Forbidden - User doesn't have access
          console.error(
            'Access denied. You do not have permission to access this resource.'
          );
          toast.error('Access denied');
        } else {
          // Other HTTP errors
          console.error('An error occurred while processing your request.');
          toast.error('Server error');
        }
      } else if (error.request) {
        // The request was made but no response was received (e.g., no internet connection)
        console.error('Network error. Please check your internet connection.');
        toast.error('Network error. Please check your internet connection.');
      } else {
        // Other errors
        toast.error('An unexpected error occurred.');
        return { error: 'Unexpected error' };
      }
    }
  };

export { RegisterUser, Login };
