import API from "src/constants/api"
import { getWithPath } from "src/utils/http"

const TemplateService = {
  getListTemplate: (params) => {
    return getWithPath(API.TEMPLATE.GET.LIST, params, {})
  },
  getDetailTemplate: (id) => {
    return getWithPath(
      API.TEMPLATE.GET.DETAIL,
      {
        template_id: id,
      },
      {}
    )
  },
}
export default TemplateService
