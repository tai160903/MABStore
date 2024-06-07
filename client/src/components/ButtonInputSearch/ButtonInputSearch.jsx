import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
function ButtonInputSearch(props) {
  const { size, placeholder, text } = props;
  return (
    <div style={{ display: "flex" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        style={{ borderRadius: "unset" }}
      />
      <ButtonComponent
        size={size}
        icon={<SearchOutlined />}
        style={{ borderRadius: "unset" }}
        text={text}
      />
    </div>
  );
}

export default ButtonInputSearch;
