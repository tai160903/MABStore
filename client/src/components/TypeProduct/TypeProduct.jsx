import React from "react";
import { useNavigate } from "react-router-dom";

function TypeProduct({ name }) {
  const navigate = useNavigate();
  const handleNavigateType = (category) => {
    navigate(
      `/product/${category
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")} `,
      { state: category }
    );
  };

  return (
    <div
      style={{ padding: "0 10px", cursor: "pointer" }}
      onClick={() => handleNavigateType(name)}
    >
      {name}
    </div>
  );
}

export default TypeProduct;
