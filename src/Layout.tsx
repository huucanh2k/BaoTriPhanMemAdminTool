import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"
import { Button, Layout as LayoutAtd, Menu, theme } from "antd"
import React, { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { navConfig } from "./router"

const { Header, Sider, Content } = LayoutAtd

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const path = useLocation().pathname

  return (
    <LayoutAtd style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]}>
          {navConfig.map((item) => (
            <Menu.Item key={item.path}>
              <item.icon />
              <span>{item.title}</span>
              <Link to={item.path} />
            </Menu.Item>
          ))}
        </Menu>
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
