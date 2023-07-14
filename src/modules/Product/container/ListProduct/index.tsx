import { red } from "@ant-design/colors"
import { useQuery } from "@apollo/client"
import {
  Button,
  Input,
  Row,
  Table,
  TablePaginationConfig,
  Typography,
} from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import ProductService from "src/adapters/services/product"
import { removeEmpty } from "src/utils"
import { useDebounce } from "usehooks-ts"
import { columnsListProduct } from "./props"
import { PlusOutlined } from "@ant-design/icons"
import { ROUTE } from "src/constants/route"

const { Search } = Input

interface TableParams {
  pagination: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: any
}

export default function ProductManagement() {
  let [searchParams, setSearchParams] = useSearchParams()
  const [tableParams, setTableParams] = useState<TableParams>(() =>
    getInitValueTableParams(searchParams)
  )
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()
  const searchValueDebounce = useDebounce(searchValue, 300)

  const { loading, error, data, refetch } = useQuery(
    ProductService.FETCH_PRODUCT,
    {
      variables: () => {
        const { current = 1, pageSize = 10 } = tableParams.pagination || {}
        return {
          skip: (current - 1) * pageSize,
          take: pageSize,
          condition: {
            name: {
              contains: searchValue || "",
            },
          },
        }
      },
    }
  )

  useEffect(() => {
    const { current, pageSize } = tableParams.pagination || {}
    if (!current || !pageSize) return
    const pagination = {
      skip: (current - 1) * pageSize,
      take: pageSize,
    }
    const filters = {
      name: searchValueDebounce,
    }
    setSearchParams(removeEmpty({ ...pagination, ...filters }))
    refetch({
      skip: (current - 1) * pageSize,
      take: pageSize,
      condition: {
        name: {
          contains: searchValueDebounce || "",
        },
      },
    })
    // Call api here, set data to setData
    // setLoading(true)
  }, [JSON.stringify(tableParams), searchValueDebounce])

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    })
  }

  // if (result.loading) return <div>Loading...</div>
  return (
    <div>
      <Row justify="space-between">
        <Typography.Title level={2} style={{ color: red[9] }}>
          Sản phẩm
        </Typography.Title>
        <Search
          placeholder="Tên sản phẩm"
          allowClear
          style={{ width: 350 }}
          onChange={({ target: { value } }) => setSearchValue(value)}
        />
      </Row>
      <Row className="my-3">
        <Button
          icon={<PlusOutlined />}
          size="large"
          type="primary"
          onClick={() => navigate(ROUTE.PRODUCT_CREATE)}
        >
          Thêm sản phẩm
        </Button>
      </Row>
      <Table
        columns={columnsListProduct}
        rowKey={(record) => record.id}
        dataSource={data?.productsWithPagination?.items}
        pagination={{
          ...tableParams.pagination,
          total: data?.productsWithPagination?.totalCount,
        }}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 1500 }}
      />
    </div>
  )
}

function getInitValueTableParams(searchParams: URLSearchParams) {
  const queryStringObj = Object.fromEntries(searchParams.entries())
  const { offset, limit, name } = queryStringObj
  return {
    pagination: {
      current: Number(offset) / Number(limit) + 1 || 1,
      pageSize: Number(limit) || 10,
    },
    filters: {
      name,
    },
  }
}
