import { Table, Typography } from "antd"
import type { TablePaginationConfig } from "antd/es/table"
import type { FilterValue } from "antd/es/table/interface"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { removeEmpty } from "src/utils"
import {
  fetchListTemplate,
  selectListTemplate,
  selectTotalTemplate,
} from "../templatesSlice"
import { columnsListTemplate } from "./props"

interface TableParams {
  pagination: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}

const ListTemplate = () => {
  const dispatch = useAppDispatch()
  const listTemplate = useAppSelector(selectListTemplate)
  const totalTemplate = useAppSelector(selectTotalTemplate)
  let [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useState<TableParams>(() =>
    getInitValueTableParams(searchParams)
  )

  useEffect(() => {
    const { current, pageSize } = tableParams.pagination || {}
    if (!current || !pageSize) return
    const queryParam = {
      offset: (current - 1) * pageSize,
      limit: pageSize,
      status: tableParams.filters?.status && tableParams.filters?.status[0],
    }
    setSearchParams(removeEmpty(queryParam))
    setLoading(true)
    dispatch(fetchListTemplate(queryParam)).then(() => setLoading(false))
  }, [JSON.stringify(tableParams)])

  const handleTableChange = (
    pagination,
    filters
    // sorter: SorterResult<ITemplateItem>
  ) => {
    const { status } = filters
    setTableParams({
      pagination,
      filters: {
        ...tableParams.filters,
        status: status as FilterValue,
      },
    })
  }

  return (
    <div>
      <Typography.Title level={2} style={{ marginBottom: 16 }}>
        Danh sách template
      </Typography.Title>
      <Table
        columns={columnsListTemplate}
        rowKey={(record) => record.templateId}
        dataSource={listTemplate}
        pagination={{ ...tableParams.pagination, total: totalTemplate }}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  )
}

function getInitValueTableParams(searchParams: URLSearchParams) {
  const queryStringObj = Object.fromEntries(searchParams.entries())
  const { offset, limit, status } = queryStringObj
  return {
    pagination: {
      current: Number(offset) / Number(limit) + 1 || 1,
      pageSize: Number(limit) || 10,
    },
    filters: {
      status: [status],
    },
  }
}

export default ListTemplate
