/* eslint-disable jsx-a11y/alt-text */
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import * as orderService from "../../services/orderService";
import { useSelector } from "react-redux";

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const fetchMyOrder = async () => {
    const res = await orderService.getOrderByUserId(user?._id);
    console.log("res", res);
    return res;
  };
  const { isPending, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchMyOrder,
  });
  console.log("data", data);
  return (
    <LoadingComponent isPending={isPending}>
      <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
        MyOrder
      </div>
    </LoadingComponent>
  );
};

export default MyOrderPage;
