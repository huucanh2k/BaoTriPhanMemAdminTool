import { Image, Tag, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { IProduct } from "src/adapters/services/product/config"
import { formatNumber } from "src/utils"

const { Text, Link } = Typography

export const columnsListProduct: ColumnsType<IProduct> = [
  {
    title: "Mã sản phẩm",
    dataIndex: "productId",
    key: "productId",
    width: 100,
    fixed: "left",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
    width: 150,
    fixed: "left",
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    align: "right",
    width: 100,
    render: (price) => <Tag color="volcano">{formatNumber(price)} VND</Tag>,
  },
  {
    title: "Giảm giá",
    dataIndex: "discount",
    key: "discount",
    align: "right",
    width: 100,
    render: (discount) => (
      <Tag color="volcano">{formatNumber(discount)} VND</Tag>
    ),
  },
  {
    title: "Tổng số lượng",
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
    width: 80,
    render: (value) => <Text mark>{value}</Text>,
  },
  {
    title: "Tổng tiền",
    dataIndex: "total",
    key: "total",
    align: "right",
    width: 100,
    render: (total) => <Tag color="volcano">{formatNumber(total)} VND</Tag>,
  },
]
