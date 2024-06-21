import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { useNavigate, useParams } from "react-router-dom";
function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div style={{ padding: "0 120px", background: "#efefef" }}>
      <p style={{ margin: "0", padding: "10px 0", fontSize: "15px" }}>
        <span
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer", fontWeight: "bolder" }}
        >
          Trang chủ
        </span>{" "}
        - Chi tiết sản phẩm
      </p>
      <ProductDetailComponent idProduct={id} />
    </div>
  );
}

export default ProductDetailPage;
