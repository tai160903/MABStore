/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/alt-text */
import { Form, Radio } from "antd";
import {
  Lable,
  WrapperInfo,
  WrapperLeft,
  WrapperRadio,
  WrapperRight,
  WrapperTotal,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { convertPrice } from "../../utils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/MessageComponent/MessageCpmponent";
import * as userService from "../../services/userService";
import * as orderService from "../../services/orderService";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/slides/orderSlide";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [payment, setPayment] = useState("later_money");
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [stateUserDetails, setStateUserDetails] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });

  const mutationAddOrder = useMutationHooks((data) => {
    const { ...rests } = data;
    const res = orderService.createOrder({ ...rests }, user?._id);
    return res;
  });

  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rests } = data;
    const res = userService.updateUser(id, { ...rests });
    return res;
  });

  const { isPending, data } = mutationUpdate;
  const {
    isPending: isPendingAddOrder,
    isSuccess,
    isError,
    data: dataAdd,
  } = mutationAddOrder;

  const handleAddOrder = () => {
    if (
      user?.accessToken &&
      order?.orderItemsSelected &&
      user?.fullName &&
      user?.address &&
      user?.phone &&
      user?.city &&
      priceMemo &&
      user?._id
    ) {
      mutationAddOrder.mutate({
        orderItems: order?.orderItemsSelected,
        fullName: user?.fullName,
        address: user?.address,
        city: user?.city,
        phone: user?.phone,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: deliveryMemo,
        totalPrice: totalMemo,
        user: user?._id,
      });
    }
  };

  const handleCancelUpdate = () => {
    form.resetFields();
    setStateUserDetails({
      username: "",
      email: "",
      isAdmin: false,
      fullName: "",
      phone: "",
      address: "",
      avatar: "",
    });
    setIsOpenModalUpdateInfo(false);
  };

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateInfoUser = () => {
    const { fullName, phone, city, address } = stateUserDetails;
    if (fullName && phone && city && address) {
      mutationUpdate.mutate(
        { id: user?._id, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ fullName, phone, city, address }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        fullName: user?.fullName,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      const ordered = [];
      order?.orderItemsSelected?.forEach((element) => {
        ordered.push(element.product);
      });
      console.log("ordered", ordered);
      dispatch(removeAllOrderProduct({ listChecked: ordered }));
      message.success("Đặt hàng thành công");
      navigate("/orderSuccess", {
        state: {
          order: order?.orderItemsSelected,
          payment,
          totalMemo: totalMemo,
        },
      });
    } else if (isError) {
      message.error("Đặt hàng thất bại");
    }
  }, [isSuccess, isError]);

  console.log("order?.orderItemsSelected", order?.orderItemsSelected);
  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  const discountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + (cur.discount / 100) * cur.price * cur.amount;
    }, 0);
    if (result) {
      return result;
    }
    return 0;
  }, [order]);

  const deliveryMemo = useMemo(() => {
    if (priceMemo > 200000) {
      return 15000;
    } else if (priceMemo === 0) {
      return 0;
    } else return 20000;
  }, [priceMemo]);

  const totalMemo = useMemo(() => {
    return Number(priceMemo) + Number(deliveryMemo) - Number(discountMemo);
  }, [priceMemo, deliveryMemo, discountMemo]);

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <LoadingComponent isPending={isPendingAddOrder}>
        <div style={{ height: "100%", padding: "0 120px", margin: "0 auto" }}>
          <h2>Thanh toán</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức thanh toán</Lable>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="later_money">
                      Thanh toán tiền mặt khi nhận hàng
                    </Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: "100%" }}>
                <WrapperInfo>
                  <div style={{ fontSize: "15px" }}>
                    <span>Địa chỉ: </span>
                    <span
                      style={{ fontWeight: "bold" }}
                    >{`${user?.address} ${user?.city}`}</span>{" "}
                    <span
                      onClick={handleChangeAddress}
                      style={{ color: "#0473ed", cursor: "pointer" }}
                    >
                      Thay đổi
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Tạm tính</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(priceMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Giảm giá</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(discountMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Phí giao hàng</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(deliveryMemo)}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "rgb(254,56,52)",
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      {convertPrice(totalMemo)}
                    </span>
                    <span style={{ color: "#000", fontSize: "14px" }}>
                      Đã bao gồm VAT nếu có
                    </span>
                  </span>
                </WrapperTotal>
              </div>
              <ButtonComponent
                size={40}
                style={{
                  background: "rgb(255,57,69)",
                  height: "48px",
                  width: "100%",
                  border: "none",
                  borderRadius: "4px",
                }}
                text={"Mua hàng"}
                styleText={{ color: "#fff" }}
                onClick={() => handleAddOrder()}
              ></ButtonComponent>
            </WrapperRight>
          </div>
        </div>
        <ModalComponent
          title="Cập nhật thông tin giao hàng"
          open={isOpenModalUpdateInfo}
          onCancel={handleCancelUpdate}
          onOk={handleUpdateInfoUser}
        >
          <LoadingComponent isPending={isPending}>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              style={{ maxWidth: 600, marginTop: "20px" }}
              // onFinish={onUpdateUser}
              autoComplete="on"
            >
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  { required: true, message: "Please input your full name!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetails.fullName}
                  onChange={handleOnChangeDetails}
                  name="fullName"
                />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <InputComponent
                  value={stateUserDetails.phone}
                  onChange={handleOnChangeDetails}
                  name="phone"
                />
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please input your city!" }]}
              >
                <InputComponent
                  value={stateUserDetails.city}
                  onChange={handleOnChangeDetails}
                  name="city"
                />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetails.address}
                  onChange={handleOnChangeDetails}
                  name="address"
                />
              </Form.Item>
            </Form>
          </LoadingComponent>
        </ModalComponent>
      </LoadingComponent>
    </div>
  );
};

export default PaymentPage;
