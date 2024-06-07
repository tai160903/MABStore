import { Input } from "antd";
import React from "react";

function InputComponent({ size, placeholder, style, ...rest }) {
  return (
    <Input size={size} placeholder={placeholder} style={style} {...rest} />
  );
}

export default InputComponent;
