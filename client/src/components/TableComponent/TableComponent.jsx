import { Table } from "antd";
import React from "react";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

function TableComponent(props) {
  const { data = [], isPending = false, columns = [], ...restProps } = props;

  return (
    <LoadingComponent isPending={isPending}>
      <Table columns={columns} dataSource={data} {...restProps} />
    </LoadingComponent>
  );
}

export default TableComponent;
