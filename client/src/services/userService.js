import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_KEY}/login`, data);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/register`,
    data
  );
  return res.data;
};

export const getDetailUser = async (id, accessToken) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_KEY}/user/detail/${id}`,
    {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

export const refreshToken = async (id, accessToken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/user/refresh_token`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
