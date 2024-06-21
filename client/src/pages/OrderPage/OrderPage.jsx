import { Checkbox } from "antd";
import {
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperPriceDiscount,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
} from "./style";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const OrderPage = ({ count = 1 }) => {
  const onChange = (e) => {
    console.log(`checked  =${e.target.value}`);
  };

  const handleChangeCount = () => {};

  const handleChangeCheckAll = () => {};

  return (
    <div>
      <div>
        <h3>Giỏ Hàng</h3>
        <div>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span>
                <Checkbox onChange={handleChangeCheckAll}></Checkbox>
                <span>Tất cả ({count} sản phẩm)</span>
              </span>
              <div>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              <WrapperItemOrder>
                <div>
                  <Checkbox onChange={onChange}></Checkbox>
                  <img src={null} />
                  <div>Tên sản phẩm</div>
                </div>
                <div>
                  <span>
                    <span style={{ fontSize: "13px", color: "#242424" }}>
                      211
                    </span>
                    <WrapperPriceDiscount>230</WrapperPriceDiscount>
                  </span>
                  <WrapperCountOrder>
                    <button>
                      <MinusOutlined />
                    </button>
                    <div onChange={onChange} defaultValue={1}></div>
                    <button>
                      <PlusOutlined />
                    </button>
                  </WrapperCountOrder>
                  <span></span>
                  <DeleteOutlined style={{ cursor: "pointer" }} />
                </div>
              </WrapperItemOrder>
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div>
                  <span>Tạm tính</span>
                  <span></span>
                </div>
                <div>
                  <span>Giảm giá</span>
                  <span></span>
                </div>
                <div>
                  <span>Thuế</span>
                  <span></span>
                </div>
                <div>
                  <span>Phí giao hàng</span>
                  <span></span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span></span>
                  <span></span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              size={40}
              style={{
                background: "rgb(255,57,69)",
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              text={"Mua hàng"}
              styleText={{ color: "#fff" }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
