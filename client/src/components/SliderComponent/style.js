import Slider from "react-slick";
import styled from "styled-components";

export const WrapperSlider = styled(Slider)`
  .slick-dots {
    display: none;
  }
  .slick-prev: before,.slick-next:before {
    color: #000;

  }
`;
