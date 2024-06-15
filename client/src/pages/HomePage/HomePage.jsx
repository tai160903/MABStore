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
function HomePage() {
  const arr = ["TV", "Tu lanh", "Laptop"];

  return (
    <>
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
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
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
    </>
  );
}

export default HomePage;
