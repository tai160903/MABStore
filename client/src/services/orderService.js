import axios from "axios";

export const createOrder = async (data) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const res = await axios.post(
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
