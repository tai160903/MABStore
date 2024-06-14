import { Card } from "antd";
import React from "react";
import {
  StyleNameProduct,
  WapperPriceText,
  WrapperDiscountText,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";

function CardComponent() {
  return (
    <Card
      hoverable
      styles={{
        body: { padding: "10px" },
        header: { width: "200px", height: "200px" },
      }}
      style={{ width: 240 }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <StyleNameProduct>Iphone</StyleNameProduct>
      <WrapperReportText>
        <span>
          <span>4.5</span>
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
        </span>
        <WrapperStyleTextSell> | Da ban 1000+</WrapperStyleTextSell>
      </WrapperReportText>
      <WapperPriceText>
        <span>1.000.000d</span>
        <WrapperDiscountText>-5%</WrapperDiscountText>
      </WapperPriceText>
    </Card>
  );
}

export default CardComponent;
