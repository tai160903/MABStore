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

export const getAllUser = async () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  console.log("accessToken", accessToken);
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/user/all`, {
    headers: {
      token: `Bearer ${accessToken}`, // Thêm token vào header
    },
  });
  return res.data;
};

export const getDetailUser = async (id) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
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

export const deleteUser = async (id) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const res = await axios.delete(
    `${process.env.REACT_APP_API_KEY}/user/delete/${id}`,
    {
      headers: {
        token: `Bearer ${accessToken}`, // Thêm token vào header
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

export const logoutUser = async () => {
  const res = await axios.post(`${process.env.REACT_APP_API_KEY}/logout`);
  localStorage.removeItem("accessToken");
  return res.data;
};

export const updateUser = async (id, data) => {
  console.log("id", id);
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_KEY}/user/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
