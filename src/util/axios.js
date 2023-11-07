import axios from 'axios';
import { BACKEND_API } from '../constants/network';

export const axiosInstance = axios.create({
  baseURL: BACKEND_API,
});

