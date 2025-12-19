import axios from "axios";

const AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUser = async () => {
  try {
    const res = await axios.get(`${AUTH_URL}/me`);
    return res.data.data;
  } catch (err) {
    console.error("User fetch error:", err);
    return null;
  }
};

export const register = async (data: {
  fullname: string;
  username: string;
  password: string;
}) => {
  const response = await axios.post(`${AUTH_URL}/register`, {
    fullName: data.fullname,
    userName: data.username,
    password: data.password,
  });

  return response.data;
};

export const login = async (data: {
  username: string;
  password: string;
}) => {
  const response = await axios.post(`${AUTH_URL}/login`, {
    userName: data.username,
    password: data.password,
  });

  return response.data;
};
