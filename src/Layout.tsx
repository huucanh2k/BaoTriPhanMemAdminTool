import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Button, Col, Layout as LayoutAtd, Menu, MenuProps, Row } from "antd"
import React, { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { navConfig } from "./router"
import Title from "antd/es/typography/Title"
import { ROUTE } from "./constants/route"
import { PoweroffOutlined } from "@ant-design/icons"

const { Header, Sider, Content } = LayoutAtd

const Layout: React.FC = () => {
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}")

  const menuItems: MenuProps["items"] = navConfig.map((item) => ({
    key: item.path || "",
    icon: React.createElement(item.icon),
    label: item.title,
    onClick: () => item.path && navigate(item.path),
    children: item.children
      ? item.children.map((child) => ({
          key: child.path || "",
          icon: React.createElement(child.icon),
          label: child.title,
          onClick: () => navigate(child.path),
        }))
      : undefined,
  }))

  const [collapsed, setCollapsed] = useState(false)
  const path = useLocation().pathname

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate(ROUTE.SIGN_IN)
  }

  useEffect(() => {
    if (!userInfo) {
      navigate(ROUTE.SIGN_IN)
    }
  }, [userInfo])

  return (
    <LayoutAtd style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={"250px"}>
        <Title
          level={3}
          style={{ color: "white", textAlign: "center" }}
          className="mt-4"
        >
          Admin Tool
        </Title>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[path]}
          items={menuItems}
        ></Menu>
      </Sider>
      <LayoutAtd>
        <Header
          style={{ padding: 0, background: "white" }}
          className="flex justify-between items-center"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="flex gap-4">
            <span className="text-lg">
              Xin chào, <b>{userInfo.fullName}</b>
            </span>
            <Button
              type="primary"
              onClick={handleLogout}
              icon={<PoweroffOutlined />}
            >
              Đăng xuất
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </LayoutAtd>
    </LayoutAtd>
  )
}

export default Layout
