import { Button, Col, Form, Input, Row, message } from "antd"
import Title from "antd/es/typography/Title"
import * as React from "react"

export interface IAccountInfoProps {}

export default function AccountInfo(props: IAccountInfoProps) {
  const [form] = Form.useForm()
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}")

  const [isEdit, setIsEdit] = React.useState(false)

  React.useEffect(() => {
    form.setFieldsValue(userInfo)
  }, [userInfo])

  const handleUpdate = async () => {
    const values = await form.validateFields()
    localStorage.setItem("user", JSON.stringify(values))
    message.success("Cập nhật thông tin thành công")
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 24 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      disabled={!isEdit}
    >
      <Title level={3} className="text-center">
        Thông tin tài khoản
      </Title>
      <Form.Item label="Họ và tên" name="fullName" required>
        <Input />
      </Form.Item>
      <Form.Item label="Số điện thoại" name="phoneNumber" required>
        <Input />
      </Form.Item>
      <Form.Item label="Địa chỉ" name="address">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" required>
        <Input />
      </Form.Item>
      <Row justify="end">
        <Button
          type={isEdit ? "default" : "primary"}
          onClick={() => setIsEdit((prev) => !prev)}
          disabled={false}
        >
          {isEdit ? "Huỷ" : "Cập nhật"}
        </Button>
        {isEdit && (
          <Button type="primary" className="ml-2" onClick={handleUpdate}>
            Lưu
          </Button>
        )}
      </Row>
    </Form>
  )
}
