// api 관련 호출 로직 모아놓은곳

import axios from 'axios';
import { Login, MovieInfo, RecommendList, Register, User } from './types';

const PORT = 3001;
const URL = `http://localhost:${PORT}`;

export const register = async ({ ...form }: Register) => {
  try {
    const queryString = new URLSearchParams(form).toString();
    const response = await axios.get(`${URL}/register?${queryString}`);
    return response.status === 201;
  } catch (err) {
    return false;
  }
};

export const login = async ({ ...form }: Login) => {
  try {
    const queryString = new URLSearchParams(form).toString();
    const response = await axios.get<User>(`${URL}/login?${queryString}`);

    return response.data;
  } catch (err) {
    return null;
  }
};

export const recommend = async ({
  ...form
}: {
  genre: string;
  limit: string;
}) => {
  try {
    const queryString = new URLSearchParams(form).toString();
    const response = await axios.get<RecommendList>(
      `${URL}/movies?${queryString}`,
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

export const getInfo = async ({ ...form }: { title: string }) => {
  try {
    const queryString = new URLSearchParams(form).toString();
    const response = await axios.get<MovieInfo>(
      `${URL}/movie-ott?${queryString}`,
    );
    return response.data;
  } catch (err) {
    return null;
  }
};
