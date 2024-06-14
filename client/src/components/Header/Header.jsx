import React from "react";
import { Badge, Col } from "antd";
import {
  WrapperAccount,
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
import { useSelector } from "react-redux";
function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  console.log("user", user);
  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
          <WrapperText>MABStore</WrapperText>
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
            <UserOutlined style={{ fontSize: "35px" }} />
            {user?.username ? (
              <div style={{ cursor: "pointer" }}>{user.username}</div>
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
