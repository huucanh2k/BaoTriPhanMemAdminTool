import { Descriptions, Typography } from "antd"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import TemplateService from "src/adapters/services/template"
import { ITemplate } from "src/adapters/services/template/config"
import { configDescriptionTemplate } from "./props"

export async function detailTemplateLoader({
  params,
}: LoaderFunctionArgs): Promise<ITemplate> {
  const response = await TemplateService.getDetailTemplate(params?.templateId)
  return response.data
}
const DetailTemplate = () => {
  const data = useLoaderData() as ITemplate

  return (
    <Descriptions
      title={
        <Typography.Title level={2} style={{ margin: 0 }}>
          Thông tin chi tiết template
        </Typography.Title>
      }
      labelStyle={{ fontWeight: "bold" }}
      column={1}
      bordered
    >
      {data &&
        configDescriptionTemplate.map((item) => {
          const renderItem = (item) => {
            const dataRender = data[item.dataIndex]
            if (dataRender === undefined || dataRender === null) return "---"
            if (item.render) {
              if (item.render(dataRender)) {
                return item.render(dataRender)
              }
            } else {
              if (typeof dataRender === "object") {
                return JSON.stringify(dataRender)
              } else {
                return dataRender
              }
            }
          }
          return (
            <Descriptions.Item
              label={item.title}
              span={item.colSpan}
              key={item.key}
            >
              {renderItem(item)}
            </Descriptions.Item>
          )
        })}
    </Descriptions>
  )
}

export default DetailTemplate
