import React from "react";
import { Col } from "antd";
import {
  WrapperAccount,
  WrapperHeader,
  WrapperText,
  WrapperTextSmall,
} from "./styled";
import Search from "antd/es/transfer/search";
import {
  CaretDownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
function Header() {
  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
          <WrapperText>MABStore</WrapperText>
        </Col>
        <Col span={12}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            // onSearch={onSearch}
          />
        </Col>
        <Col span={6} style={{ display: "flex", gap: "12px" }}>
          <WrapperAccount>
            <UserOutlined style={{ fontSize: "35px" }} />
            <div>
              <WrapperTextSmall>Đăng nhập/Đăng ký</WrapperTextSmall>
              <div>
                <WrapperTextSmall>Tài khoản</WrapperTextSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperAccount>
          <div>
            <ShoppingCartOutlined style={{ fontSize: "35px", color: "#fff" }} />
            <WrapperTextSmall>Giỏ hàng</WrapperTextSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
}

export default Header;
