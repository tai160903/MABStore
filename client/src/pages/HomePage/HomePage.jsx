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
import { useState } from "react";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useDebounce } from "../../hooks/useDebounce";

function HomePage() {
  const [pending, setPending] = useState(false);
  const [limit, setLimit] = useState(10);
  const searchProduct = useSelector((state) => state.product?.search);
  const arr = ["TV", "Tủ lạnh", "Laptop", "Sữa bột cao cấp"];

  const searchDebounce = useDebounce(searchProduct, 1000);

  const fetchAllProduct = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await productService.getAllProduct(search, limit);

    return res;
  };

  const {
    isPending,
    data: products,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce], // Change queryKey to an array with a single string element
    queryFn: fetchAllProduct,
    retry: 3,
    retryDelay: 1000,
    placeholderData: (previousData, previousQuery) => previousData,
  });

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
          {products?.data?.map((product) => {
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <WrapperButtonMore
            disabled={
              products?.total === products?.data?.length ||
              products?.totalPage === 1
            }
            text={
              products?.total === products?.data?.length ||
              products?.totalPage === 1
                ? "Đã tới cuối trang"
                : "Xem thêm"
            }
            type="outline"
            style={{
              border: "3px solid #ff469e",
              color: `${
                products?.total === products?.data?.length ? "#ccc" : "#ff469e"
              }`,
              width: "240px",
              height: "38px",
            }}
            styleText={{
              fontWeight: 500,
              color: products?.total === products?.data?.length && "#fff",
            }}
            onClick={() => setLimit((prev) => prev + 5)}
          />
        </div>
      </div>
    </LoadingComponent>
  );
}

export default HomePage;
