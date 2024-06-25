/* eslint-disable jsx-a11y/alt-text */
import { Checkbox, Form } from "antd";
import {
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
} from "./style";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { WrapperInput } from "../../components/ProductDetailComponent/style";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import { useEffect, useMemo, useState } from "react";
import { convertPrice } from "../../utils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/MessageComponent/MessageCpmponent";
import * as userService from "../../services/userService";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { updateUser } from "../../redux/slides/userSlide";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [stateUserDetails, setStateUserDetails] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });

  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleAddCard = () => {
    if (!order?.orderItemsSelected?.length) {
      message.error("Vui lòng chọn sản phẩm");
    } else if (!user?.phone || !user.address || !user.fullName || !user.city) {
      setIsOpenModalUpdateInfo(true);
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

  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rests } = data;
    const res = userService.updateUser(id, { ...rests });
    return res;
  });

  const { isPending, data } = mutationUpdate;
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

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCount = (type, idProduct) => {
    if (type === "increase") {
      dispatch(increaseAmount({ idProduct }));
    } else {
      dispatch(decreaseAmount({ idProduct }));
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleChangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  const handleRemoveAllOrder = () => {
    if (listChecked?.length) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

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

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  const discountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      // return total + (cur.discount / 100) * Number(priceMemo);
      return total + (cur.discount / 100) * cur.price * cur.amount;
    }, 0);
    if (result) {
      return result;
    }
    return 0;
  }, [order]);

  const diliveryMemo = useMemo(() => {
    if (priceMemo > 200000) {
      return 15000;
    } else if (priceMemo === 0) {
      return 0;
    } else return 20000;
  }, [priceMemo]);

  const totalMemo = useMemo(() => {
    return Number(priceMemo) + Number(diliveryMemo) - Number(discountMemo);
  }, [priceMemo, diliveryMemo, discountMemo]);

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", padding: "0 120px", margin: "0 auto" }}>
        <h2>Giỏ Hàng</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox
                  onChange={handleChangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                ></Checkbox>
                <span>Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                console.log("checkOrder", order);
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
                      <Checkbox
                        onChange={onChange}
                        value={order?.product}
                        checked={listChecked.includes(order?.product)}
                      ></Checkbox>
                      <img
                        src={order?.image}
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
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
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          {convertPrice(order?.price)}
                        </span>
                      </span>
                      <WrapperCountOrder>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount("decrease", order?.product)
                          }
                        >
                          <MinusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                        <WrapperInput
                          // onChange={onChange}
                          defaultValue={order?.amount}
                          value={order?.amount}
                          size="small"
                        ></WrapperInput>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount("increase", order?.product)
                          }
                        >
                          <PlusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                      </WrapperCountOrder>
                      <span
                        style={{
                          color: "rgb(255,66,78)",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        {convertPrice(order?.price * order?.amount)}
                      </span>
                      <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteOrder(order?.product)}
                      />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
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
                    {convertPrice(diliveryMemo)}
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
              onClick={() => handleAddCard()}
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
                { required: true, message: "Please input your phone number!" },
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
    </div>
  );
};

export default OrderPage;
