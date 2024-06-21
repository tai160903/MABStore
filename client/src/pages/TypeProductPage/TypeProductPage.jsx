import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import * as productService from "../../services/productService";
import { useLocation } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

function TypeProductPage() {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [pending, setPending] = useState(false);

  const fetchProductType = async (category) => {
    setPending(true);
    const res = await productService.getProductType(category);
    if (res?.status == "OK") {
      setProducts(res?.data);
      setPending(false);
    } else {
      setPending(false);
    }
    // return res.data;
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state);
    }
  }, [state]);

  const onChange = () => {};
  return (
    <LoadingComponent isPending={pending}>
      <div style={{ padding: "0 120px", background: "#efefef" }}>
        <Row
          style={{
            flexWrap: "nowrap",
            paddingTop: "10px",
          }}
        >
          <WrapperNavbar span={4}>
            <NavbarComponent />
          </WrapperNavbar>
          <Col
            span={20}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <WrapperProducts>
              {products?.map((product) => {
                return (
                  <CardComponent
                    key={product._id}
                    quantity={product.quantity}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    category={product.category}
                    weight={product.weight}
                    brand={product.brand}
                    selled={product.selled}
                    discount={product.discount}
                    id={product._id}
                  />
                );
              })}
            </WrapperProducts>
            <Pagination
              defaultCurrent={2}
              total={100}
              onChange={onChange}
              style={{ textAlign: "center", marginTop: "15px" }}
            />
          </Col>
        </Row>
      </div>
    </LoadingComponent>
  );
}

export default TypeProductPage;
