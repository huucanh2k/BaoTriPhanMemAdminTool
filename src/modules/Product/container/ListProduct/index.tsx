import { Input, Row, Table, TablePaginationConfig, Typography } from "antd"
import { red } from "@ant-design/colors"
import { columnsListProduct } from "./props"
import { mockupData } from "./dataMockup"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { removeEmpty } from "src/utils"
import { FilterValue } from "antd/es/table/interface"

const { Search } = Input

interface TableParams {
  pagination: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: any
}

export default function ProductManagement() {
  const [data, setData] = useState(mockupData)
  let [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useState<TableParams>(() =>
    getInitValueTableParams(searchParams)
  )
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    const { current, pageSize } = tableParams.pagination || {}
    if (!current || !pageSize) return
    const pagination = {
      skip: (current - 1) * pageSize,
      take: pageSize,
    }
    const filters = {
      name: searchValue,
    }
    setSearchParams(removeEmpty({ ...pagination, ...filters }))
    // Call api here, set data to setData
    // setLoading(true)
  }, [JSON.stringify(tableParams), searchValue])

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    })
  }

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
      <Table
        columns={columnsListProduct}
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
