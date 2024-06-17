import axios from "axios";

export const getAllProduct = async (data) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/product/`,
    data
  );
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
