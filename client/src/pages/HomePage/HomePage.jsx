import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "./style";
import banner_1 from "../../asset/image/banner_1.jpg";
import banner_2 from "../../asset/image/banner_2.jpg";
import banner_3 from "../../asset/image/banner_3.jpg";
function HomePage() {
  const arr = ["TV", "Tu lanh", "Laptop"];

  return (
    <div style={{ padding: "0 120px" }}>
      <WrapperTypeProduct>
        {arr.map((item) => {
          return <TypeProduct name={item} key={item} />;
        })}
      </WrapperTypeProduct>
      <div>
        <SliderComponent arrImg={[banner_1, banner_2, banner_3]} />
      </div>
    </div>
  );
}

export default HomePage;
