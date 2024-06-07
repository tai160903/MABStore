import { Button } from "antd";

function ButtonComponent({ size, style, text, ...rest }) {
  return (
    <Button size={size} style={{ borderRadius: "unset" }} {...rest}>
      {text}
    </Button>
  );
}

export default ButtonComponent;
