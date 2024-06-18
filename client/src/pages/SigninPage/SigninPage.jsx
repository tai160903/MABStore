import React, { useEffect, useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { WrapperTextLight } from "./style";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as userService from "../../services/userService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
function SigninPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => userService.loginUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status !== "ERR") {
      navigate("/");
      localStorage.setItem("accessToken", JSON.stringify(data?.accessToken));
      if (data?.accessToken) {
        const decode = jwtDecode(data?.accessToken);
        if (decode?.id) {
          handlegetDetailUser(decode?.id, data?.accessToken);
        }
      }
    }
  }, [isError, data]);

  const handlegetDetailUser = async (id, accessToken) => {
    const res = await userService.getDetailUser(id, accessToken);
    dispatch(updateUser({ ...res?.data, accessToken: accessToken }));
  };

  const handleNavigateSignup = () => {
    navigate("/sign-up");
  };

  const handleOnChangeUsername = (value) => {
    setUsername(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleSignup = () => {
    mutation.mutate({
      username,
      password,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        background: "rgb(0,0,0,0.53)",
      }}
    >
      <div
        style={{
          height: "500px",
          width: "400px",
          borderRadius: "6px",
          background: "#fff",
          padding: "0 50px",
        }}
      >
        <h1 style={{ fontSize: "40px" }}>Xin chào</h1>
        <p style={{ fontSize: "20px" }}>Đăng nhập vào tài khoản</p>
        <InputForm
          placeholder="Username"
          style={{ margin: "12px 0" }}
          value={username}
          onChange={handleOnChangeUsername}
        />
        <div style={{ position: "relative" }}>
          <span
            onClick={() => {
              setIsShowPassword(!isShowPassword);
            }}
            style={{
              zIndex: 10,
              position: "absolute",
              top: "7px",
              right: "8px",
              fontSize: "20px",
            }}
          >
            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </span>
          <InputForm
            placeholder="Password"
            type={isShowPassword ? "text" : "password"}
            style={{ marginBottom: "12px" }}
            value={password}
            onChange={handleOnChangePassword}
          />
        </div>
        {data?.status === "ERR" && (
          <span style={{ color: "red" }}>{data?.message}</span>
        )}
        <LoadingComponent isPending={isPending}>
          <ButtonComponent
            disabled={!username.length || !password.length}
            onClick={handleSignup}
            size={40}
            style={{
              background: "#ff469e",
              width: "100%",
              height: "35px",
              margin: "30px 0 10px",
            }}
            text="Đăng nhập"
            styleText={{ color: "#fff", fontSize: "15px", fontWeight: 700 }}
          />
        </LoadingComponent>
        <p>
          <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
        </p>
        <p style={{ fontSize: "15px" }}>
          Chưa có tài khoản?{" "}
          <WrapperTextLight onClick={handleNavigateSignup}>
            Tạo tài khoản
          </WrapperTextLight>
        </p>
      </div>
    </div>
  );
}

export default SigninPage;
