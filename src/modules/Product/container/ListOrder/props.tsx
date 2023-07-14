import { Tag, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import {
  IProductOrder,
  StatusConfig
} from "src/adapters/services/product/config"

const { Text, Link } = Typography

export const columnsListOrder: ColumnsType<IProductOrder> = [
  {
    title: "Số hoá đơn",
    dataIndex: "id",
    key: "id",
    width: 80,
    fixed: "left",
  },
  {
    title: "Tên người đặt",
    dataIndex: "fullName",
    key: "fullName",
    width: 150,
    fixed: "left",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    align: "center",
    width: 100,
    fixed: "left",
  },
  {
    title: "Địa chỉ",
    dataIndex: "shippingAddress",
    key: "shippingAddress",
    width: 150,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 100,
    align: "center",
    render: (status) => (
      <Tag color={StatusConfig.Color[status]}>{StatusConfig.Label[status]}</Tag>
    ),
  },
  {
    title: "Ngày đặt",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    width: 150,
  },
  {
    title: "Lý do hủy",
    dataIndex: "reasonsForRejection",
    key: "reasonsForRejection",
    width: 150,
    render: (reasonsForRejection) => (
      <Text type="danger">{reasonsForRejection}</Text>
    ),
  },
  {
    title: "Số lượng sản phẩm",
    dataIndex: "products",
    key: "products",
    width: 100,
    align: "center",
    fixed: "right",
    render: (products: any[]) => <Text mark>{products.length}</Text>,
  },
]
