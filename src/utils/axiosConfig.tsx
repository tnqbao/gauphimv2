import axios, { AxiosInstance } from 'axios';
const createUserApiInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_USER_API,
    withCredentials: true, 
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '5000', 10),
  });
};

const createMovieApiInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_MOVIE_API,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '5000', 10),
  });
};

export const userApiInstance = createUserApiInstance();
export const movieApiInstance = createMovieApiInstance();
