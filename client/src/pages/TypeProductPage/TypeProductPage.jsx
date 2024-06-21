import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import * as productService from "../../services/productService";
import { useLocation } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

function TypeProductPage() {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);

  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [pending, setPending] = useState(false);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 8,
    total: 1,
  });

  const fetchProductType = async (category, page, limit) => {
    setPending(true);
    const res = await productService.getProductType(category, page, limit);
    if (res?.status == "OK") {
      setProducts(res?.data);
      console.log("res", res);
      setPanigate({ ...panigate, total: res?.total });
      setPending(false);
    } else {
      setPending(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state, panigate.page, panigate.limit);
    }
  }, [state, panigate.limit, panigate.page]);

  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };
  return (
    <LoadingComponent isPending={pending}>
      <div style={{ padding: "0 120px", background: "#efefef" }}>
        <Row
          style={{
            flexWrap: "nowrap",
            paddingTop: "10px",
            height: "100%",
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
              {products
                ?.filter((pro) => {
                  if (searchDebounce === "") {
                    return pro;
                  } else if (
                    pro?.name
                      ?.toLowerCase()
                      ?.includes(searchDebounce?.toLowerCase())
                  ) {
                    return pro;
                  }
                })
                ?.map((product) => {
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
              defaultCurrent={panigate.page + 1}
              total={panigate?.total}
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
