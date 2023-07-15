import * as React from "react"

import { Button, Checkbox, Form, Input, message } from "antd"
import Title from "antd/es/typography/Title"
import { ROUTE } from "src/constants/route"
import { useNavigate } from "react-router-dom"

export interface ISignInProps {}

export default function SignIn(props: ISignInProps) {
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    // Save token to local storage
    const singIn = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (values.username === "admin" && values.password === "123456789") {
          resolve(null)
        } else {
          reject(null)
        }
      }, 500)
    })
    singIn
      .then(() => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: values.username,
            fullName: "Trần Văn A",
            phoneNumber: "0123456789",
            address: "Hồ Chí Minh",
            email: "tranhuucanh2000@gmail.com",
            role: "admin",
          })
        )
        message.success("Đăng nhập thành công")
        navigate(ROUTE.PRODUCT_LIST)
      })
      .catch(() => {
        message.error("Đăng nhập thất bại")
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="w-[500px] mx-auto mt-[20vh]"
    >
      <Title level={3} className="text-center">
        Đăng nhập
      </Title>
      <Form.Item
        label="Tên đăng nhập"
        name="username"
        rules={[{ required: true, message: "Làm ơn nhập tên đăng nhập" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Làm ơn nhập mật khẩu" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  )
}
