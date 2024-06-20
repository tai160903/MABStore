import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import banner_1 from "../../asset/image/banner_1.jpg";
import banner_2 from "../../asset/image/banner_2.jpg";
import banner_3 from "../../asset/image/banner_3.jpg";
import CardComponent from "../../components/CardComponent/CardComponent";
import * as productService from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useDebounce } from "../../hooks/useDebounce";

function HomePage() {
  const [stateProduct, setStateProduct] = useState([]);
  const [pending, setPending] = useState(false);
  const searchProduct = useSelector((state) => state.product?.search);
  const refSearch = useRef(false);
  const arr = ["TV", "Tu lanh", "Laptop"];

  const searchDebounce = useDebounce(searchProduct, 1000);

  const fetchAllProduct = async (search) => {
    const res = await productService.getAllProduct(search);
    if (search.length > 0 || refSearch.current) {
      setStateProduct(res?.data);
    } else {
      return res;
    }
  };

  useEffect(() => {
    if (refSearch.current) {
      setPending(true);
      fetchAllProduct(searchDebounce);
    }
    refSearch.current = true;
    setPending(false);
  }, [searchDebounce]);

  const { isPending, data: products } = useQuery({
    queryKey: ["products"], // Change queryKey to an array with a single string element
    queryFn: fetchAllProduct,
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateProduct(products?.data);
    }
  }, [products]);

  return (
    <LoadingComponent isPending={isPending || pending}>
      <WrapperTypeProduct style={{ padding: "0 120px" }}>
        {arr.map((item) => {
          return <TypeProduct name={item} key={item} />;
        })}
      </WrapperTypeProduct>
      <div
        style={{
          padding: "0 120px",
          backgroundColor: "#efefef",
        }}
      >
        <SliderComponent arrImg={[banner_1, banner_2, banner_3]} />
        <WrapperProducts>
          {stateProduct?.map((product) => {
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
              />
            );
          })}
        </WrapperProducts>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <WrapperButtonMore
            text="Xem them"
            type="outline"
            style={{
              border: "3px solid #ff469e",
              color: "#ff469e",
              width: "240px",
              height: "38px",
            }}
            styleText={{ fontWeight: 500 }}
          />
        </div>
      </div>
    </LoadingComponent>
  );
}

export default HomePage;
