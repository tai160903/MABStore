import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React from "react";
function ButtonInputSearch(props) {
  const { size, placeholder, text } = props;
  return (
    <div style={{ display: "flex" }}>
      <Input
        size={size}
        placeholder={placeholder}
        style={{ borderRadius: "unset" }}
      />
      <Button
        size={size}
        icon={<SearchOutlined />}
        style={{ borderRadius: "unset" }}
      >
        {text}
      </Button>
    </div>
  );
}

export default ButtonInputSearch;
