import {
  DashboardOutlined,
  FundOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  StockOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import { ROUTE } from "./constants/route"
import UserInfo from "./modules/Account/container/Account"
import Dashboard from "./modules/Dashboard"
import ProductContainer from "./modules/Product/container"
import CreateProduct from "./modules/Product/container/CreateProduct"
import DetailProduct from "./modules/Product/container/DetailProduct"
import ListOrder from "./modules/Product/container/ListOrder"
import ProductManagement from "./modules/Product/container/ListProduct"
import StatisticContainer from "./modules/Statistic/container"
import OrderStatistic from "./modules/Statistic/container/OrderStatistic"
import RevenueStatistic from "./modules/Statistic/container/RevenueStatistic"
import DetailOrder from "./modules/Product/container/DetailOrder"
import SignIn from "./modules/Auth/container/SignIn"

const router = createBrowserRouter([
  {
    path: ROUTE.DASHBOARD,
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: ROUTE.ACCOUNT,
        Component: UserInfo,
      },
      {
        path: ROUTE.PRODUCT,
        Component: ProductContainer,
        children: [
          {
            path: ROUTE.PRODUCT_LIST,
            Component: ProductManagement,
          },
          {
            path: ROUTE.PRODUCT_ORDER,
            Component: ListOrder,
          },
          {
            path: ROUTE.ORDER_DETAIL,
            Component: DetailOrder,
          },
          {
            path: ROUTE.PRODUCT_CREATE,
            Component: CreateProduct,
          },
          {
            path: ROUTE.PRODUCT_DETAIl,
            Component: DetailProduct,
          },
        ],
      },
      {
        path: ROUTE.STATISTIC,
        Component: StatisticContainer,
        children: [
          {
            path: ROUTE.STATISTIC_REVENUE,
            Component: RevenueStatistic,
          },
          {
            path: ROUTE.STATISTIC_ORDER,
            Component: OrderStatistic,
          },
        ],
      },
    ],
  },
  {
    path: ROUTE.SIGN_IN,
    Component: SignIn,
  },
])

export const navConfig = [
  {
    icon: DashboardOutlined,
    title: "Trung tâm điều khiển",
    path: ROUTE.DASHBOARD,
  },
  {
    icon: UserOutlined,
    title: "Tài khoản",
    path: ROUTE.ACCOUNT,
  },
  {
    icon: ShoppingCartOutlined,
    title: "Sản phẩm",
    children: [
      {
        title: "Quản lý sản phẩm",
        path: ROUTE.PRODUCT_LIST,
        icon: UnorderedListOutlined,
      },
      {
        title: "Đơn đặt hàng",
        path: ROUTE.PRODUCT_ORDER,
        icon: UploadOutlined,
      },
    ],
  },
  {
    icon: FundOutlined,
    title: "Thống kê",
    children: [
      {
        title: "Thống kê doanh thu",
        path: ROUTE.STATISTIC_REVENUE,
        icon: StockOutlined,
      },
      {
        title: "Thống kê đơn hàng",
        path: ROUTE.STATISTIC_ORDER,
        icon: PieChartOutlined,
      },
    ],
  },
]

export default router
