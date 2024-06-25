import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { useNavigate, useParams } from "react-router-dom";
function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: "0 120px",
        height: "100vh",
        background: "#efefef",
      }}
    >
      <div style={{ width: "100%", height: "100%", margin: "0 auto" }}>
        <p style={{ margin: "0", padding: "10px 0", fontSize: "15px" }}>
          <span
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer", fontWeight: "bolder" }}
          >
            Trang chủ
          </span>
          - Chi tiết sản phẩm
        </p>
        <ProductDetailComponent idProduct={id} />
      </div>
    </div>
  );
}

export default ProductDetailPage;
