import { Input } from "antd";
import React from "react";
function InputForm(props) {
  const { placeholder, ...rest } = props;
  const handleOnChangeInput = (e) => {
    props.onChange(e.target.value);
  };
  return (
    <Input
      placeholder={placeholder}
      value={props.value}
      {...rest}
      onChange={handleOnChangeInput}
    />
  );
}

export default InputForm;
