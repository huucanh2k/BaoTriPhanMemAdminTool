import { useMutation, useQuery } from "@apollo/client"
import {
  Button,
  Col,
  Descriptions,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Tag,
  message,
} from "antd"
import Title from "antd/es/typography/Title"
import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import ProductService from "src/adapters/services/product"
import { StatusConfig } from "src/adapters/services/product/config"
import { columnsListProduct } from "./props"

export interface IDetailOrderProps {}

export default function DetailOrder(props: IDetailOrderProps) {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const [visible, setVisible] = React.useState(false)

  const { data: orderDetail, refetch } = useQuery(
    ProductService.FETCH_ORDER_BY_ID,
    {
      variables: {
        condition: {
          id: {
            eq: id,
          },
        },
      },
    }
  )
  const [updateOrder] = useMutation(ProductService.UPDATE_ORDER)
  const [deleteOrder] = useMutation(ProductService.DELETE_ORDER)
  const handleSubmitForm = async () => {
    const values = await form.validateFields()
    console.log({ values })
    const input = {
      id,
      ...values,
    }
    try {
      await updateOrder({
        variables: {
          input,
        },
      })
      message.success("Cập nhật đơn hàng thành công")
      setVisible(false)
      refetch()
    } catch (error) {
      message.error("Cập nhật đơn hàng thất bại")
    }
  }

  const handleDelteProduct = async () => {
    try {
      await deleteOrder({
        variables: {
          input: {
            id,
          },
        },
      })
      navigate(-1)
      message.success("Xóa đơn hàng thành công")
    } catch (error) {
      message.error("Xóa đơn hàng thất bại")
    }
  }

  React.useEffect(() => {
    if (orderDetail) {
      const { __typename, ...rest } = orderDetail.order[0]
      console.log({ rest })
      form.setFieldsValue({
        ...rest,
      })
    }
  }, [orderDetail, form])

  const dataOrder = orderDetail?.order[0]

  console.log({ dataOrder })

  return (
    <>
      <Descriptions bordered title={<Title level={2}>Chi tiết đơn hàng</Title>}>
        <Descriptions.Item label="Số hoá đơn">{id}</Descriptions.Item>
        <Descriptions.Item label="Tên người đặt">
          {dataOrder?.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {dataOrder?.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          {dataOrder?.shippingAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={StatusConfig.Color[dataOrder?.status]}>
            {StatusConfig.Label[dataOrder?.status]}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày đặt">
          {dataOrder?.createdAt}
        </Descriptions.Item>
        <Descriptions.Item label="Lý do hủy">
          {dataOrder?.reasonsForRejection}
        </Descriptions.Item>
        <Descriptions.Item label="Thông báo đẩy">
          {dataOrder?.pushNotification ? "Có" : "Không"}
        </Descriptions.Item>
      </Descriptions>
      <Title level={5} className="my-4">
        Danh sách sản phẩm
      </Title>
      <Table
        columns={columnsListProduct}
        rowKey={(record) => record.id}
        dataSource={dataOrder?.products}
        scroll={{ x: 1500 }}
      />
      <Row justify="end" className="my-4" gutter={24}>
        <Col>
          <Button
            type="primary"
            size="large"
            onClick={() => setVisible((prev) => !prev)}
          >
            Sửa đơn hàng
          </Button>
        </Col>
        <Col>
          <Popconfirm
            title="Xoá đơn hàng"
            description="Bạn có chắc chắn muốn xóa?"
            onConfirm={handleDelteProduct}
            okText="Xoá"
            cancelText="Hủy"
            disabled={false}
          >
            <Button danger disabled={false} size="large">
              Xoá đơn hàng
            </Button>
          </Popconfirm>
        </Col>
      </Row>
      <Modal
        title="Chỉnh sửa thông tin"
        open={visible}
        onOk={handleSubmitForm}
        onCancel={() => setVisible(false)}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="fullName" label="Tên người đặt">
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item name="shippingAddress" label="Địa chỉ">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
