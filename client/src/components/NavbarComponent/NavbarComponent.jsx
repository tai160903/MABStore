import React from "react";
import {
  WrapperContent,
  WrapperLableText,
  WrapperTextValue,
  WrapperTexttPrice,
} from "./style";
import { Checkbox, Rate } from "antd";
function NavbarComponent() {
  const onChange = () => {};
  const rederContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <WrapperTextValue>{option}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
            onChange={onChange}
          >
            {options.map((option) => {
              return <Checkbox value={option.value}>{option.label}</Checkbox>;
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option) => {
          return (
            <div style={{ display: "flex", gap: "20px", fontSize: "15px" }}>
              <Rate disabled defaultValue={option} />
              <span>Tu {option} sao</span>
            </div>
          );
        });
      case "price":
        return options.map((option) => {
          return <WrapperTexttPrice>{option}</WrapperTexttPrice>;
        });
      default:
        return {};
    }
  };

  return (
    <div>
      <WrapperLableText>Lable</WrapperLableText>
      <WrapperContent>
        {rederContent("text", ["Tu lanh", "TV", "May giat"])}
        {rederContent("checkbox", [
          { value: "A", label: "A" },
          { value: "B", label: "B" },
        ])}
      </WrapperContent>
      <WrapperContent>{rederContent("star", [3, 4, 5])}</WrapperContent>
      <WrapperContent>
        {rederContent("price", ["tren 40", "duoi 100"])}
      </WrapperContent>
    </div>
  );
}

export default NavbarComponent;
