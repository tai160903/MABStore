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

function CardComponent(props) {
  const { image, name, price, rating, selled, discount } = props;
  return (
    <Card
      hoverable
      styles={{
        body: { padding: "10px" },
        header: { width: "200px", height: "300px" },
      }}
      style={{ width: 240 }}
      cover={<img alt="example" src={image} />}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span>
          <span>{rating}</span>
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
        </span>
        <WrapperStyleTextSell>
          {" "}
          | Da ban {selled || 1000} +
        </WrapperStyleTextSell>
      </WrapperReportText>
      <WapperPriceText>
        <span>{price.toLocaleString()}</span>
        <WrapperDiscountText>- {discount || 5} %</WrapperDiscountText>
      </WapperPriceText>
    </Card>
  );
}

export default CardComponent;
