import { Image, Tag, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { IProduct } from "src/adapters/services/product/config"
import { formatNumber } from "src/utils"

const { Text, Link } = Typography

export const columnsListProduct: ColumnsType<IProduct> = [
  {
    title: "Mã sản phẩm",
    dataIndex: "id",
    key: "id",
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
    title: "Ảnh sản phẩm",
    dataIndex: "featuredImage",
    key: "featuredImage",
    width: 100,
    render: (featuredImage) => (
      <Image
        width={100}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    ),
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
    dataIndex: "maxQuantity",
    key: "maxQuantity",
    align: "center",
    width: 80,
    render: (value) => <Text mark>{value}</Text>,
  },
  {
    title: "Số lượt mua",
    dataIndex: "totalPurchases",
    key: "totalPurchases",
    align: "center",
    width: 80,
    render: (value) => <Text mark>{value}</Text>,
  },
  {
    title: "Số lượt xem",
    dataIndex: "totalViews",
    key: "totalViews",
    align: "center",
    width: 80,
    render: (value) => <Text mark>{value}</Text>,
  },
  {
    title: "Số lượt đánh giá",
    dataIndex: "totalRatings",
    key: "totalRatings",
    align: "center",
    width: 80,
    render: (value) => <Text mark>{value}</Text>,
  },
  {
    title: "Điểm đánh giá trung bình",
    dataIndex: "ratingAvg",
    key: "ratingAvg",
    align: "center",
    width: 80,
    render: (ratingAvg) => <Text mark>{Number(ratingAvg).toFixed(2)}</Text>,
  },
]
