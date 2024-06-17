import { Button, Form, Modal } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader, WrapperUploadFile } from "./style";
import React, { useEffect, useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as productService from "../../services/productService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import * as message from "../../components/MessageComponent/MessageCpmponent";

function AdminProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    image: "",
    category: "",
    quantity: "",
    rating: "",
    weight: "",
    brand: "",
    price: "",
    description: "",
  });

  const [form] = Form.useForm();

  const mutation = useMutationHooks((data) => {
    const {
      name,
      image,
      category,
      quantity,
      rating,
      weight,
      brand,
      price,
      description,
    } = data;
    const res = productService.createProduct({
      name,
      image,
      category,
      quantity,
      rating,
      weight,
      brand,
      price,
      description,
    });
    return res;
  });

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      image: "",
      category: "",
      quantity: "",
      rating: "",
      weight: "",
      brand: "",
      price: "",
      description: "",
    });
    form.resetFields();
  };

  const onFinish = () => {
    mutation.mutate(stateProduct);
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const { data, isPending, isSuccess, isError } = mutation;

  console.log("data", data);

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, data, isError]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
        <div>
          <Button
            style={{ background: "#1677ff", color: "white", fontWeight: 700 }}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent />
      </div>
      <Modal
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <LoadingComponent isLoading={isPending}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            style={{ maxWidth: 600, marginTop: "20px" }}
            onFinish={onFinish}
            autoComplete="on"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateProduct.name}
                onChange={handleOnChange}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                { required: true, message: "Please input your category!" },
              ]}
            >
              <InputComponent
                value={stateProduct.category}
                onChange={handleOnChange}
                name="category"
              />
            </Form.Item>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                { required: true, message: "Please input your quantity!" },
              ]}
            >
              <InputComponent
                value={stateProduct.quantity}
                onChange={handleOnChange}
                name="quantity"
              />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: "Please input your rating!" }]}
            >
              <InputComponent
                value={stateProduct.rating}
                onChange={handleOnChange}
                name="rating"
              />
            </Form.Item>
            <Form.Item
              label="Weight"
              name="weight"
              rules={[{ required: true, message: "Please input your weight!" }]}
            >
              <InputComponent
                value={stateProduct.weight}
                onChange={handleOnChange}
                name="weight"
              />
            </Form.Item>
            <Form.Item
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please input your brand!" }]}
            >
              <InputComponent
                value={stateProduct.brand}
                onChange={handleOnChange}
                name="brand"
              />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <InputComponent
                value={stateProduct.price}
                onChange={handleOnChange}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <InputComponent
                value={stateProduct.description}
                onChange={handleOnChange}
                name="description"
              />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                <Button>Select File</Button>
                <div style={{ marginTop: "40px" }}>
                  {stateProduct?.image && (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      style={{
                        height: "250px",
                        width: "250px",
                        objectFit: "cover",
                      }}
                      src={stateProduct?.image}
                      alt="image"
                    />
                  )}
                </div>
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </Modal>
    </div>
  );
}

export default AdminProduct;
