import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Button, Layout as LayoutAtd, Menu, MenuProps } from "antd"
import React, { useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { navConfig } from "./router"

const { Header, Sider, Content } = LayoutAtd

const Layout: React.FC = () => {
  const navigate = useNavigate()

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

  return (
    <LayoutAtd style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={"250px"}>
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[path]}
          items={menuItems}
        ></Menu>
      </Sider>
      <LayoutAtd>
        <Header style={{ padding: 0, background: "white" }}>
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
