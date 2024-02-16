import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { BASE_URL } from '../constant';
import store from '../store';

// Create an Axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// Create a dynamic method to make requests with custom headers
axiosInstance.makeRequest = function (
  method: string,
  url: string,
  data?: any,
  customHeaders?: Record<string, string> | undefined
): Promise<AxiosResponse> {
  const config: AxiosRequestConfig = {
    method: method,
    url: `${BASE_URL}${url}`,
    data: data,
    headers: customHeaders,
  };
  (function () {
    const token = store.getState().login.user_info.token;
    const NewToken = token;
    if (token !== null) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${NewToken}`;
    } else {
      axios.defaults.headers.common['Authorization'] = null;
    }
  })();

  // // Add response interceptors
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Handle successful responses
      return response;
    },
    (error: AxiosError) => {
      // Handle errors
      return Promise.reject(error);
    }
  );

  try {
    const response = axios(config);
    return response;
  } catch (error: any) {
    return error;
  }
};

export default axiosInstance;
