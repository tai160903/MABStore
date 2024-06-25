import {
  Lable,
  WrapperContainer,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperItemsOrderInfo,
  WrapperValue,
} from "./style";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { orderContain } from "../../contain";
import { convertPrice } from "../../utils";

const OrderSucess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location;

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <LoadingComponent isPending={false}>
        <div style={{ height: "100%", padding: "0 120px", margin: "0 auto" }}>
          <h2>Đơn đặt hàng thành công</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức thanh toán</Lable>
                  <WrapperValue>
                    {orderContain.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemsOrderInfo>
                {state.order?.map((order) => {
                  return (
                    <WrapperItemOrder>
                      <div
                        style={{
                          width: "390px",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <img
                          src={order?.image}
                          style={{
                            width: "77px",
                            height: "79px",
                            objectFit: "cover",
                          }}
                          alt=""
                        />
                        <div
                          style={{
                            width: "295px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {order?.name}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <span>
                          <span style={{ fontSize: "13px", color: "#242424" }}>
                            {convertPrice(order?.price)}
                          </span>
                        </span>
                        <span>
                          <span style={{ fontSize: "13px", color: "#242424" }}>
                            Số lượng: {order?.amount}
                          </span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  );
                })}
              </WrapperItemsOrderInfo>
              <div>
                <span
                  style={{
                    color: "rgb(254,56,52)",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  Tổng tiền: {convertPrice(state?.totalMemo)}
                </span>
              </div>
            </WrapperContainer>
          </div>
        </div>
      </LoadingComponent>
    </div>
  );
};

export default OrderSucess;
