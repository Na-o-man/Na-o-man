import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useRecoilState } from 'recoil';
import { accessToken } from 'recoil/states/enter';
import { getCookie } from 'utils/UseCookies';

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TOKEN = getCookie('access-token');

export const baseInstance = (
  options: AxiosRequestConfig = {},
): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    ...options,
  });
};

// 토큰 값 포함
export const authInstance = (
  options: AxiosRequestConfig = {},
): AxiosInstance => {
  console.log(`token : ${TOKEN}`);
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    withCredentials: true,
    ...options,
  });
};
