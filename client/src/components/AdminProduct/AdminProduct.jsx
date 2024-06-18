import { Button, Form } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader, WrapperUploadFile } from "./style";
import React, { useEffect, useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as productService from "../../services/productService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import * as message from "../../components/MessageComponent/MessageCpmponent";
import { useQuery } from "@tanstack/react-query";
import { DeleteFilled, EditTwoTone } from "@ant-design/icons";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import ModalComponent from "../ModalComponent/ModalComponent";

function AdminProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
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

  const [stateProductDetails, setStateProductDetails] = useState({
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

  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rests } = data;
    const res = productService.updateProduct(id, { ...rests });
    return res;
  });

  const mutationDelete = useMutationHooks((data) => {
    const { id } = data;
    const res = productService.deleteProduct(id);
    return res;
  });

  const getAllProduct = async () => {
    const res = await productService.getAllProduct();
    return res;
  };
  console.log("mutationUpdate", mutationUpdate);
  const { data, isPending, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isPending: isPendingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isPending: isPendingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDelete;
  const {
    isPending: isPendingProduct,
    data: products,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await productService.getDetailProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data.name,
        image: res?.data.image,
        category: res?.data.category,
        quantity: res?.data.quantity,
        rating: res?.data.rating,
        weight: res?.data.weight,
        brand: res?.data.brand,
        price: res?.data.price,
        description: res?.data.description,
      });
    }
    setIsPendingUpdate(false);
  };

  useEffect(() => {
    form.setFieldsValue(stateProductDetails);
  }, [form, stateProductDetails]);

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected]);

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };

  const renderAction = () => {
    return (
      <div>
        <DeleteFilled
          style={{
            color: "red",
            fontSize: "20px",
            marginRight: "10px",
            cursor: "pointer",
          }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditTwoTone
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
      </div>
    );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
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

  const handleOnChangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
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

  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    mutationDelete.mutate({ id: rowSelected });
    setIsModalOpenDelete(false);
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

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
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

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
      refetch();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
      refetch();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted]);

  const onUpdateProduct = () => {
    mutationUpdate.mutate({ id: rowSelected, ...stateProductDetails });
  };

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
        <TableComponent
          columns={columns}
          isPending={isPendingProduct}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              }, // click row
            };
          }}
        />
      </div>
      <ModalComponent
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <LoadingComponent isPending={isPending}>
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
                value={stateProduct["name"]}
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
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="80%"
      >
        <LoadingComponent isPending={isPendingUpdate || isPendingUpdated}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            style={{ maxWidth: 600, marginTop: "20px" }}
            onFinish={onUpdateProduct}
            autoComplete="on"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateProductDetails["name"]}
                onChange={handleOnChangeDetails}
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
                value={stateProductDetails.category}
                onChange={handleOnChangeDetails}
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
                value={stateProductDetails.quantity}
                onChange={handleOnChangeDetails}
                name="quantity"
              />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: "Please input your rating!" }]}
            >
              <InputComponent
                value={stateProductDetails.rating}
                onChange={handleOnChangeDetails}
                name="rating"
              />
            </Form.Item>
            <Form.Item
              label="Weight"
              name="weight"
              rules={[{ required: true, message: "Please input your weight!" }]}
            >
              <InputComponent
                value={stateProductDetails.weight}
                onChange={handleOnChangeDetails}
                name="weight"
              />
            </Form.Item>
            <Form.Item
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please input your brand!" }]}
            >
              <InputComponent
                value={stateProductDetails.brand}
                onChange={handleOnChangeDetails}
                name="brand"
              />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <InputComponent
                value={stateProductDetails.price}
                onChange={handleOnChangeDetails}
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
                value={stateProductDetails.description}
                onChange={handleOnChangeDetails}
                name="description"
              />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <WrapperUploadFile
                onChange={handleOnChangeAvatarDetails}
                maxCount={1}
              >
                <Button>Select File</Button>
                <div style={{ marginTop: "40px" }}>
                  {stateProductDetails?.image && (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      style={{
                        height: "250px",
                        width: "250px",
                        objectFit: "cover",
                      }}
                      src={stateProductDetails?.image}
                      alt="image"
                    />
                  )}
                </div>
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </DrawerComponent>

      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        <LoadingComponent isPending={isPendingDeleted}>
          <div>Bạn có muốn xóa sản phẩm này không?</div>
        </LoadingComponent>
      </ModalComponent>
    </div>
  );
}

export default AdminProduct;
