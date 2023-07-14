import { useMutation, useQuery } from "@apollo/client"
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message,
} from "antd"
import Title from "antd/es/typography/Title"
import ProductService from "src/adapters/services/product"

export interface ICreateProductProps {}

export default function CreateProduct(props: ICreateProductProps) {
  const { data } = useQuery(ProductService.FETCH_PRODUCT_CATEGORY)
  const [createProduct] = useMutation(ProductService.CREATE_PRODUCT)
  const optionsProductCategory =
    data?.productCategoriesWithPagination?.items?.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  const [form] = Form.useForm()
  const handleSubmitForm = async () => {
    const values = await form.validateFields()
    const input = values
    try {
      await createProduct({
        variables: {
          input,
        },
      })
      message.success("Thêm sản phẩm thành công")
    } catch (error) {
      message.error("Thêm sản phẩm thất bại")
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      className="container mx-auto"
      onFinish={handleSubmitForm}
    >
      <Title level={3}>Thêm sản phẩm</Title>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Tên sản phẩm" name="name">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Danh mục" name="categoryId">
            <Select options={optionsProductCategory} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Mô tả" name="description">
        <Input.TextArea />
      </Form.Item>
      <Row gutter={24}>
        <Col span={9}>
          <Form.Item label="Giá" name="price">
            <InputNumber className="w-full" />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item label="Số lượng" name="maxQuantity">
            <InputNumber className="w-full" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Ngày hết hạn" name="expiryDate">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Nguyên liệu" name="ingredient">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Bảo quản" name="preservation">
        <Input.TextArea />
      </Form.Item>
      <Button htmlType="submit" type="primary" size="large">
        Thêm
      </Button>
    </Form>
  )
}
