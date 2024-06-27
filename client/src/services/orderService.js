import { axiosJWT } from "./userService";

export const createOrder = async (data) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/order/create`,
    data,
    {
      headers: {
        token: `Bearer ${accessToken}`, // Thêm token vào header
      },
    }
  );
  return res.data;
};

export const getOrderByUserId = async (id) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_KEY}/order/order-detail/${id}`,
    {
      headers: {
        token: `Bearer ${accessToken}`, // Thêm token vào header
      },
    }
  );
  return res.data;
};
