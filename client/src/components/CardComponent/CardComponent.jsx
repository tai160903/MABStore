import { Card } from "antd";
import React from "react";
import {
  StyleNameProduct,
  WapperPriceText,
  WrapperCard,
  WrapperDiscountText,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

function CardComponent(props) {
  const { image, name, price, rating, selled, discount, id, quantity } = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-detail/${id}`);
  };
  return (
    <WrapperCard
      hoverable
      styles={{
        body: { padding: "10px" },
        header: { width: "300px", height: "300px" },
      }}
      style={{ width: 240 }}
      cover={<img style={{ height: "250px" }} alt="" src={image} />}
      onClick={() => quantity !== 0 && handleDetailsProduct(id)}
      // disable={quantity === 0}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span>
          <span>{rating}</span>
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
        </span>
        <WrapperStyleTextSell>| Da ban {selled} +</WrapperStyleTextSell>
      </WrapperReportText>
      <WapperPriceText>
        <span>{convertPrice(price)}</span>
        <WrapperDiscountText>- {discount || 5} %</WrapperDiscountText>
      </WapperPriceText>
    </WrapperCard>
  );
}

export default CardComponent;
