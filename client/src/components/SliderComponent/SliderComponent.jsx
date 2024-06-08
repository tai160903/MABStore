import { Image } from "antd";
import React from "react";
import Slider from "react-slick";
function SliderComponent({ arrImg }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Slider {...settings}>
      {arrImg.map((img) => {
        return <Image src={img} alt="banner" preview={false} width="100%" />;
      })}
    </Slider>
  );
}

export default SliderComponent;
