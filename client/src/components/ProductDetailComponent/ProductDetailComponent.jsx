import { Col, Image, Rate, Row } from "antd";
import React, { useState } from "react";
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
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as productService from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";

function ProductDetailComponent({ idProduct }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await productService.getDetailProduct(id);
      return res.data;
    }
  };

  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else {
      setNumProduct(numProduct - 1);
    }
  };

  const { isPending, data: productDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });

  console.log("productDetails", productDetails);

  const handleAddOrderProduct = () => {
    if (!user?._id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
          },
        })
      );
    }
  };

  console.log("productDetails", productDetails, user);

  return (
    <LoadingComponent isPending={isPending}>
      <Row style={{ padding: "16px", background: "white", flexWrap: "nowrap" }}>
        <Col
          span={10}
          style={{ borderRight: "2px solid #ccc", paddingRight: "10px" }}
        >
          <Image
            preview={false}
            src={productDetails?.image}
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
          <WrapperStyleNameProduct>
            {productDetails?.name}
          </WrapperStyleNameProduct>
          <div>
            <Rate
              allowHalf
              value={productDetails?.rating}
              defaultValue={productDetails?.rating}
            />
            <WrapperStyleTextSell>| Da ban 1000+</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {convertPrice(productDetails?.price)}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao den</span>
            <span className="address">{user?.address}</span> -
            <span className="change_address"> Doi dia chi</span>
          </WrapperAddressProduct>
          <hr />
          <div>
            <div style={{ margin: "10px 0", fontSize: "15px" }}>So luong</div>
            <WrapperQuanlityProduct>
              <button style={{ border: "none", background: "transparent" }}>
                <MinusOutlined
                  style={{ color: "#000", fontSize: "20px" }}
                  onClick={() => handleChangeCount("decrease")}
                />
              </button>
              <WrapperInput
                onChange={onChange}
                value={numProduct}
                defaultValue={1}
                size="middle"
              />

              <button style={{ border: "none", background: "transparent" }}>
                <PlusOutlined
                  style={{ color: "#000", fontSize: "20px" }}
                  onClick={() => handleChangeCount("increase")}
                />
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
              text="Chọn mua"
              styleText={{ color: "#fff", fontSize: "15px", fontWeight: 700 }}
              onClick={handleAddOrderProduct}
            />
            <ButtonComponent
              size={40}
              style={{
                width: "220px",
                height: "48px",
                border: "1px solid rgb(13,92,182)",
              }}
              text="Mua trả sau"
              styleText={{ color: "rgb(13,92,182)", fontSize: "15px" }}
            />
          </div>
        </Col>
      </Row>
    </LoadingComponent>
  );
}

export default ProductDetailComponent;
