import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import Dashboard from "./modules/Dashboard"
import ListTemplate from "./modules/Templates/ListTemplate"

import { ContainerOutlined, UserOutlined } from "@ant-design/icons"
import DetailTemplate, { detailTemplateLoader } from "./modules/Templates/DetailTemplate"
import ErrorDetailTemplate from "./modules/Templates/DetailTemplate/error"

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        // loader: homeLoader,
        Component: Dashboard,
      },
      {
        path: "/template",
        Component: ListTemplate,
      },
      {
        path: "/template/:templateId",
        loader: detailTemplateLoader,
        ErrorBoundary: ErrorDetailTemplate,
        Component: DetailTemplate,
      },
    ],
  },
])

export const navConfig = [
  {
    icon: UserOutlined,
    title: "Dashboard",
    path: "/",
  },
  {
    icon: ContainerOutlined,
    title: "Template",
    path: "/template",
  },
]

export default router
