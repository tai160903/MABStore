import React, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLable,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as userService from "../../services/userService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as message from "../../components/MessageComponent/MessageCpmponent";
import { updateUser } from "../../redux/slides/userSlide";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { getBase64 } from "../../utils";
function Profile() {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [point, setPoint] = useState("");

  const mutation = useMutationHooks((data) => {
    const { _id, accessToken, ...rests } = data;
    userService.updateUser(_id, data, accessToken);
  });
  const dispatch = useDispatch();
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    setUsername(user?.username);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
    setFullName(user?.fullName);
    setPoint(user?.point);
  }, [user]);

  useEffect(() => {
    if (isSuccess && data?.status !== "ERR") {
      message.success();
      handlegetDetailUser(user?._id, user?.accessToken);
    } else if (isError) {
      message.error();
    }
  }, [isError, isSuccess, data]);

  const handlegetDetailUser = async (id, accessToken) => {
    const res = await userService.getDetailUser(id, accessToken);
    dispatch(updateUser({ ...res?.data, accessToken: accessToken }));
  };

  const handleOnChangeUsername = (value) => {
    setUsername(value);
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnChangeFullName = (value) => {
    setFullName(value);
  };

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  const handleUpdate = () => {
    mutation.mutate({
      _id: user?._id,
      username,
      email,
      phone,
      fullName,
      address,
      avatar,
      accessToken: user?.accessToken,
    });
  };
  return (
    <div style={{ padding: "0 120px", margin: "0 auto" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <LoadingComponent isPending={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLable htmlFor="username">Avatar</WrapperLable>
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </WrapperUploadFile>
            {avatar && (
              <img
                style={{
                  height: "100px",
                  width: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={avatar}
                alt="avatar"
              />
            )}
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              style={{
                width: "40px%",
                height: "30px",
                border: "1px solid #ff469e",
              }}
              text="Cập nhật"
              styleText={{
                color: "#ff469e",
                fontSize: "15px",
                fontWeight: 700,
              }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="username">Username</WrapperLable>
            <InputForm
              id="username"
              style={{ width: "300px" }}
              value={username}
              onChange={handleOnChangeUsername}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              style={{
                width: "40px%",
                height: "30px",
                border: "1px solid #ff469e",
              }}
              text="Cập nhật"
              styleText={{
                color: "#ff469e",
                fontSize: "15px",
                fontWeight: 700,
              }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="email">Email</WrapperLable>
            <InputForm
              id="email"
              style={{ width: "300px" }}
              value={email}
              onChange={handleOnChangeEmail}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              style={{
                width: "40px%",
                height: "30px",
                border: "1px solid #ff469e",
              }}
              text="Cập nhật"
              styleText={{
                color: "#ff469e",
                fontSize: "15px",
                fontWeight: 700,
              }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="fullName">Full Name</WrapperLable>
            <InputForm
              id="fullName"
              style={{ width: "300px" }}
              value={fullName}
              onChange={handleOnChangeFullName}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              style={{
                width: "40px%",
                height: "30px",
                border: "1px solid #ff469e",
              }}
              text="Cập nhật"
              styleText={{
                color: "#ff469e",
                fontSize: "15px",
                fontWeight: 700,
              }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="phone">Phone</WrapperLable>
            <InputForm
              id="phone"
              style={{ width: "300px" }}
              value={phone}
              onChange={handleOnChangePhone}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              style={{
                width: "40px%",
                height: "30px",
                border: "1px solid #ff469e",
              }}
              text="Cập nhật"
              styleText={{
                color: "#ff469e",
                fontSize: "15px",
                fontWeight: 700,
              }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="address">Address</WrapperLable>
            <InputForm
              id="address"
              style={{ width: "300px" }}
              value={address}
              onChange={handleOnChangeAddress}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              style={{
                width: "40px%",
                height: "30px",
                border: "1px solid #ff469e",
              }}
              text="Cập nhật"
              styleText={{
                color: "#ff469e",
                fontSize: "15px",
                fontWeight: 700,
              }}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLable htmlFor="point">Point</WrapperLable>
            <InputForm
              id="point"
              style={{ width: "300px" }}
              value={point}
              disabled
            />
          </WrapperInput>
        </WrapperContentProfile>{" "}
      </LoadingComponent>
    </div>
  );
}

export default Profile;
