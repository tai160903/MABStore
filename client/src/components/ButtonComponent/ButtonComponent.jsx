import { Button } from "antd";

function ButtonComponent({ size, style, text, styleText, disabled, ...rest }) {
  return (
    <Button
      size={size}
      style={{ ...style, background: disabled ? "#ccc" : style.background }}
      {...rest}
    >
      <span style={styleText}>{text}</span>
    </Button>
  );
}

export default ButtonComponent;
