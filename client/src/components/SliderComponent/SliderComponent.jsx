import { Image } from "antd";
import React from "react";
import { WrapperSlider } from "./style";
function SliderComponent({ arrImg }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <WrapperSlider {...settings}>
      {arrImg.map((img) => {
        return (
          <Image
            key={img}
            src={img}
            alt="banner"
            preview={false}
            width="100%"
          />
        );
      })}
    </WrapperSlider>
  );
}

export default SliderComponent;
