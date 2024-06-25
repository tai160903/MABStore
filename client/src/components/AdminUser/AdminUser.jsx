/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Space } from "antd";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import InputComponent from "../InputComponent/InputComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useEffect, useRef, useState } from "react";
import * as message from "../../components/MessageComponent/MessageCpmponent";
import { getBase64 } from "../../utils";
import { DeleteFilled, EditTwoTone, SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as userService from "../../services/userService";

function AdminUser() {
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const searchInput = useRef(null);

  const [stateUserDetails, setStateUserDetails] = useState({
    username: "",
    email: "",
    isAdmin: false,
    fullName: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rests } = data;
    const res = userService.updateUser(id, { ...rests });
    return res;
  });

  const mutationDelete = useMutationHooks((data) => {
    const { id } = data;
    const res = userService.deleteUser(id);
    return res;
  });

  const getAllUser = async () => {
    const res = await userService.getAllUser();
    return res;
  };
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
    isPending: isPendingUser,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
  });

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await userService.getDetailUser(rowSelected);
    if (res?.data) {
      setStateUserDetails({
        username: res?.data.username,
        email: res?.data.email,
        isAdmin: res?.data.isAdmin,
        fullName: res?.data.fullName,
        phone: res?.data.phone,
        address: res?.data.address,
        avatar: res?.data.avatar,
      });
    }
    setIsPendingUpdate(false);
  };

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected]);

  const handleDetailsUser = () => {
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
          onClick={handleDetailsUser}
        />
      </div>
    );
  };

  const handleSearch = (confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => a.username.length - b.username.length,
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "User",
          value: false,
        },
        {
          text: "Admin",
          value: true,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.isAdmin === true;
        }
        return record.isAdmin === false;
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable =
    users?.data?.length &&
    users?.data?.map((user) => {
      return {
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? "Admin" : "User",
      };
    });

  const handleOnChangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview,
    });
  };

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteUser = () => {
    mutationDelete.mutate({ id: rowSelected });
    setIsModalOpenDelete(false);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      username: "",
      email: "",
      isAdmin: false,
      fullName: "",
      phone: "",
      address: "",
      avatar: "",
    });
    form.resetFields();
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
      refetch();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated, isErrorUpdated, dataUpdated, refetch]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
      refetch();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted, isErrorDeleted, dataDeleted, refetch]);

  const onUpdateUser = () => {
    mutationUpdate.mutate({ id: rowSelected, ...stateUserDetails });
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
        <WrapperHeader>Quản lý tài khoàn</WrapperHeader>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isPending={isPendingUser}
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

      <DrawerComponent
        title="Chi tiết tài khoàn"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="80%"
        forceRender
      >
        <LoadingComponent isPending={isPendingUpdate || isPendingUpdated}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            style={{ maxWidth: 600, marginTop: "20px" }}
            onFinish={onUpdateUser}
            autoComplete="on"
          >
            <Form.Item label="Userame" name="username">
              <InputComponent
                value={stateUserDetails["username"]}
                onChange={handleOnChangeDetails}
                name="username"
                disabled
              />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <InputComponent
                value={stateUserDetails.email}
                onChange={handleOnChangeDetails}
                name="email"
                disabled
              />
            </Form.Item>
            <Form.Item label="Full Name" name="fullName">
              <InputComponent
                value={stateUserDetails.fullName}
                onChange={handleOnChangeDetails}
                name="fullName"
              />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnChangeDetails}
                name="phone"
              />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnChangeDetails}
                name="address"
              />
            </Form.Item>
            <Form.Item label="Avatar" name="avatar">
              <WrapperUploadFile
                onChange={handleOnChangeAvatarDetails}
                maxCount={1}
              >
                <Button>Select File</Button>
                <div style={{ marginTop: "40px" }}>
                  {stateUserDetails?.avatar && (
                    <img
                      style={{
                        height: "250px",
                        width: "250px",
                        objectFit: "cover",
                      }}
                      src={stateUserDetails?.avatar}
                      alt="avatar"
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
        title="Xóa tài khoàn"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}
      >
        <LoadingComponent isPending={isPendingDeleted}>
          <div>Bạn có muốn xóa tài khoàn này không?</div>
        </LoadingComponent>
      </ModalComponent>
    </div>
  );
}

export default AdminUser;
