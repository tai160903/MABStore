import { Menu } from "antd";
import { useState } from "react";
import { getItem } from "../../utils";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import Header from "../../components/Header/Header";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";

function AdminPage() {
  const items = [
    getItem("Người dùng", "user", <UserOutlined />),
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      default:
        return <></>;
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };
  return (
    <>
      <Header isHiddenSearch isHiddenCart />
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          style={{ width: 256, boxShadow: "1px 1px 2px #ccc", height: "105vh" }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: "15px" }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
}

export default AdminPage;
