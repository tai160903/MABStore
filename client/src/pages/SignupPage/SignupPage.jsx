import React, { useEffect, useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { WrapperTextLight } from "./style";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import * as userService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as message from "../../components/MessageComponent/MessageCpmponent";
function SignupPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => userService.signupUser(data));
  const { data, isPending, isError, isSuccess } = mutation;
  useEffect(() => {
    if (isSuccess && data?.status !== "ERR") {
      message.success();
      handleNavigateLogin();
    } else if (isError) {
      message.error();
    }
  }, [isError, isSuccess, data]);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleOnChangeUsername = (value) => {
    setUsername(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleSignup = () => {
    mutation.mutate({ username, password, confirmPassword, email });
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
        <p style={{ fontSize: "20px" }}>Đăng ký tài khoản</p>
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

        <div style={{ position: "relative" }}>
          <span
            onClick={() => {
              setIsShowConfirmPassword(!isShowConfirmPassword);
            }}
            style={{
              zIndex: 10,
              position: "absolute",
              top: "7px",
              right: "8px",
              fontSize: "20px",
            }}
          >
            {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </span>
          <InputForm
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleOnChangeConfirmPassword}
            type={isShowConfirmPassword ? "text" : "password"}
          />

          <InputForm
            placeholder="Email"
            style={{ margin: "12px 0" }}
            value={email}
            onChange={handleOnChangeEmail}
          />
        </div>
        {data?.status === "ERR" && (
          <span style={{ color: "red" }}>{data?.message}</span>
        )}
        <LoadingComponent isPending={isPending}>
          <ButtonComponent
            disabled={
              !username.length ||
              !password.length ||
              !confirmPassword.length ||
              !email.length
            }
            onClick={handleSignup}
            size={40}
            style={{
              background: "#ff469e",
              width: "100%",
              height: "35px",
              margin: "30px 0 10px",
            }}
            text="Đăng ký"
            styleText={{ color: "#fff", fontSize: "15px", fontWeight: 700 }}
          />
        </LoadingComponent>

        <p style={{ fontSize: "15px" }}>
          Đã có tài khoản?{" "}
          <WrapperTextLight onClick={handleNavigateLogin}>
            Đăng nhập
          </WrapperTextLight>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
