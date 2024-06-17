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
  const {
    quantity,
    description,
    image,
    name,
    price,
    rating,
    category,
    weight,
    brand,
    selled,
    discount,
  } = props;
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
        <span>{price}</span>
        <WrapperDiscountText>{discount || 5} %</WrapperDiscountText>
      </WapperPriceText>
    </Card>
  );
}

export default CardComponent;
