import { Col, Image, Row } from "antd";
import React from "react";
import {
  WrapperAddressProduct,
  WrapperInput,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQuanlityProduct,
  WrapperStyleColImage,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from "./style";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
function ProductDetailComponent() {
  return (
    <Row style={{ padding: "16px", background: "white", flexWrap: "nowrap" }}>
      <Col
        span={10}
        style={{ borderRight: "2px solid #ccc", paddingRight: "10px" }}
      >
        <Image
          preview={false}
          src="https://down-vn.img.susercontent.com/file/vn-50009109-f2d486720aefafc6ae70caa57f4c0149"
          alt="image-product"
        />
        <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
          <WrapperStyleColImage span={4}>
            <Image
              style={{ height: "64px", width: "64px" }}
              preview={false}
              src="https://down-vn.img.susercontent.com/file/vn-50009109-f2d486720aefafc6ae70caa57f4c0149"
              alt="image-small"
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <Image
              style={{ height: "64px", width: "64px" }}
              preview={false}
              src="https://down-vn.img.susercontent.com/file/vn-50009109-f2d486720aefafc6ae70caa57f4c0149"
              alt="image-small"
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <Image
              style={{ height: "64px", width: "64px" }}
              preview={false}
              src="https://down-vn.img.susercontent.com/file/vn-50009109-f2d486720aefafc6ae70caa57f4c0149"
              alt="image-small"
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <Image
              style={{ height: "64px", width: "64px" }}
              preview={false}
              src="https://down-vn.img.susercontent.com/file/vn-50009109-f2d486720aefafc6ae70caa57f4c0149"
              alt="image-small"
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <Image
              style={{ height: "64px", width: "64px" }}
              preview={false}
              src="https://down-vn.img.susercontent.com/file/vn-50009109-f2d486720aefafc6ae70caa57f4c0149"
              alt="image-small"
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <Image
              style={{ height: "64px", width: "64px" }}
              preview={false}
              src="https://down-vn.img.susercontent.com/file/vn-50009109-f2d486720aefafc6ae70caa57f4c0149"
              alt="image-small"
            />
          </WrapperStyleColImage>
        </Row>
      </Col>
      <Col span={14} style={{ margin: "0 15px", paddingRight: "50px" }}>
        <WrapperStyleNameProduct>Sach</WrapperStyleNameProduct>
        <div>
          <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54)" }} />
          <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54)" }} />
          <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54)" }} />
          <WrapperStyleTextSell>| Da ban 1000+</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>200.000</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Giao den</span>
          <span className="address">asdfafhdafkdhfdksfhsdkfhdskj</span> -
          <span className="change_address"> Doi dia chi</span>
        </WrapperAddressProduct>
        <hr />
        <div>
          <div style={{ margin: "10px 0", fontSize: "15px" }}>So luong</div>
          <WrapperQuanlityProduct>
            <button style={{ border: "none", background: "transparent" }}>
              <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
            <WrapperInput defaultValue={3} onChange={onchange} size="middle" />

            <button style={{ border: "none", background: "transparent" }}>
              <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
          </WrapperQuanlityProduct>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <ButtonComponent
            size={40}
            style={{ background: "#ff469e", width: "220px", height: "48px" }}
            text="Chon mua"
            styleText={{ color: "#fff", fontSize: "15px", fontWeight: 700 }}
          />
          <ButtonComponent
            size={40}
            style={{
              width: "220px",
              height: "48px",
              border: "1px solid rgb(13,92,182)",
            }}
            text="Mua tra sau"
            styleText={{ color: "rgb(13,92,182)", fontSize: "15px" }}
          />
        </div>
      </Col>
    </Row>
  );
}

export default ProductDetailComponent;
