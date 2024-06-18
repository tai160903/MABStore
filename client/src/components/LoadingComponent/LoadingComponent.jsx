import { Spin } from "antd";
import React from "react";
function LoadingComponent({ children, isPending, delay = 200 }) {
  return (
    <Spin spinning={isPending} delay={delay}>
      {children}
    </Spin>
  );
}

export default LoadingComponent;
