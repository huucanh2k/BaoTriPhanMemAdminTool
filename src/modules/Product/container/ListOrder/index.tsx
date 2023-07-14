import { red } from "@ant-design/colors"
import { Input, Row, Table, TablePaginationConfig, Typography } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { removeEmpty } from "src/utils"
import { mockupData } from "./dataMockup"
import { columnsListOrder } from "./props"
import ProductService from "src/adapters/services/product"
import { useDebounce } from "usehooks-ts"
import { useQuery } from "@apollo/client"

const { Search } = Input

interface TableParams {
  pagination: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: any
}
export default function ListOrder() {
  let [searchParams, setSearchParams] = useSearchParams()
  const [tableParams, setTableParams] = useState<TableParams>(() =>
    getInitValueTableParams(searchParams)
  )
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()
  const searchValueDebounce = useDebounce(searchValue, 300)

  const { loading, error, data, refetch } = useQuery(
    ProductService.FETCH_ORDERS,
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

  return (
    <div>
      <Row justify="space-between">
        <Typography.Title level={2} style={{ color: red[9] }}>
          Hoá đơn
        </Typography.Title>
        <Search
          placeholder="Số hoá đơn"
          allowClear
          style={{ width: 350 }}
          onChange={({ target: { value } }) => setSearchValue(value)}
        />
      </Row>
      <Table
        columns={columnsListOrder}
        rowKey={(record) => record.id}
        dataSource={data.items}
        pagination={{
          ...tableParams.pagination,
          total: data.totalCount,
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
