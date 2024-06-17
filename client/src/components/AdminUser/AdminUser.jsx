import { Button } from "antd";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";

function AdminUser() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <WrapperHeader>Quản lý người dùng</WrapperHeader>
        <div>
          <Button
            style={{ background: "#1677ff", color: "white", fontWeight: 700 }}
          >
            Thêm người dùng
          </Button>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent />
      </div>
    </div>
  );
}

export default AdminUser;
