import axios from "axios";
import * as userService from "./userService";
export const getAllProduct = async (search) => {
  let res = {};
  console.log("tim", search);
  if (search.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_KEY}/product/all?filter=${search}&filter=name`
    );
  } else {
    res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/all`);
  }
  return res.data;
};
export const createProduct = async (data) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/product/create`,
    data,
    {
      headers: {
        token: `Bearer ${accessToken}`, // Thêm token vào header
      },
    }
  );
  return res.data;
};

export const getDetailProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/product/detail/${id}`
  );
  console.log("res.data", res.data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const res = await axios.put(
    `${process.env.REACT_APP_API_KEY}/product/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${accessToken}`, // Thêm token vào header
      },
    }
  );
  return res.data;
};

export const deleteProduct = async (id) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const res = await userService.axiosJWT.delete(
    `${process.env.REACT_APP_API_KEY}/product/delete/${id}`,

    {
      headers: {
        token: `Bearer ${accessToken}`, // Thêm token vào header
      },
    }
  );
  return res.data;
};
