import { useMutation, useQuery } from "@apollo/client"
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
  message,
} from "antd"
import Title from "antd/es/typography/Title"
import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import ProductService from "src/adapters/services/product"

export interface IDetailProductProps {}

export default function DetailProduct(props: IDetailProductProps) {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const [isEdit, setIsEdit] = React.useState(false)

  const { data: productDetail } = useQuery(ProductService.FETCH_PRODUCT_BY_ID, {
    variables: {
      condition: {
        id: {
          eq: id,
        },
      },
    },
  })
  const { data: productCategory } = useQuery(
    ProductService.FETCH_PRODUCT_CATEGORY
  )
  const [updateProduct] = useMutation(ProductService.UPDATE_PRODUCT)
  const [delelProduct] = useMutation(ProductService.DELETE_PRODUCT)
  const optionsProductCategory =
    productCategory?.productCategoriesWithPagination?.items?.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  const handleSubmitForm = async () => {
    const values = await form.validateFields()
    const input = {
      id,
      ...values,
    }
    try {
      await updateProduct({
        variables: {
          input,
        },
      })
      message.success("Cập nhật sản phẩm thành công")
    } catch (error) {
      message.error("Cập nhật sản phẩm thất bại")
    }
  }

  const handleDelteProduct = async () => {
    try {
      await delelProduct({
        variables: {
          input: {
            id,
          },
        },
      })
      navigate(-1)
      message.success("Xóa sản phẩm thành công")
    } catch (error) {
      message.error("Xóa sản phẩm thất bại")
    }
  }

  React.useEffect(() => {
    if (productDetail) {
      const { __typename, category, ...rest } = productDetail.products[0]
      console.log({ rest })
      form.setFieldsValue({
        ...rest,
        categoryId: category.id,
      })
    }
  }, [productDetail, form])

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        className="container mx-auto"
        onFinish={handleSubmitForm}
        disabled={!isEdit}
      >
        <Row justify="space-between">
          <Title level={3}>
            {isEdit ? "Cập nhật sản phẩm" : "Chi tiết sản phẩm"}
          </Title>
          <div>
            <Button
              type={isEdit ? "default" : "primary"}
              className="mr-2"
              onClick={() => setIsEdit(!isEdit)}
              disabled={false}
            >
              {isEdit ? "Hủy" : "Chỉnh sửa"}
            </Button>
            {isEdit && (
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            )}
          </div>
        </Row>
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
      </Form>

      <Popconfirm
        title="Xoá sản phẩm"
        description="Bạn có chắc chắn muốn xóa?"
        onConfirm={handleDelteProduct}
        okText="Xoá"
        cancelText="Hủy"
        disabled={false}
      >
        <Button danger disabled={false} size="large">
          Xoá sản phẩm
        </Button>
      </Popconfirm>
    </>
  )
}
