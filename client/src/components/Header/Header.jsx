import React, { useEffect, useState } from "react";
import { Badge, Col, Popover } from "antd";
import {
  WrapperAccount,
  WrapperContentPopup,
  WrapperHeader,
  WrapperText,
  WrapperTextSmall,
} from "./styled";
import {
  CaretDownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as userService from "../../services/userService";
import { resetUser } from "../../redux/slides/userSlide";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleLogout = async () => {
    await userService.logoutUser();
    dispatch(resetUser());
    navigate("/");
  };

  useEffect(() => {
    setUsername(user?.username);
    setAvatar(user?.avatar);
  }, [user?.username, user?.avatar]);

  const content = (
    <div>
      <WrapperContentPopup onClick={handleLogout}>
        Đăng Xuất
      </WrapperContentPopup>
      <WrapperContentPopup
        onClick={() => {
          navigate("/profile-user");
        }}
      >
        Thông tin người dùng
      </WrapperContentPopup>
    </div>
  );
  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
          <WrapperText
            onClick={() => {
              navigate("/");
            }}
          >
            MABStore
          </WrapperText>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size="large"
            placeholder="input search text"
            text="Tìm kiếm"
            // onSearch={onSearch}
          />
        </Col>
        <Col
          span={6}
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "space-around",
          }}
        >
          <WrapperAccount>
            {avatar ? (
              <img
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
                src={avatar}
                alt="avatar"
              />
            ) : (
              <UserOutlined style={{ fontSize: "35px" }} />
            )}
            {user?.accessToken ? (
              <>
                <Popover content={content} trigger="click">
                  <div style={{ cursor: "pointer" }}>
                    {username.length < 8 ? username : "User"}
                  </div>
                </Popover>
              </>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                <WrapperTextSmall>Đăng nhập/Đăng ký</WrapperTextSmall>
                <div>
                  <WrapperTextSmall>Tài khoản</WrapperTextSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WrapperAccount>
          <div>
            <Badge count={4} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "35px", color: "#fff" }}
              />
            </Badge>
            <WrapperTextSmall>Giỏ hàng</WrapperTextSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
}

export default Header;
