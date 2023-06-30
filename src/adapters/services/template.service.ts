import API from "src/constants/api";
import { getWithPath } from "src/utils/http";

const TemplateService = {
  getListTemplate: (params) => {
    return getWithPath(API.TEMPLATE.GET.LIST, params, {});
  },
  getDetailTemplate: (params) => {
    return getWithPath(API.TEMPLATE.GET.DETAIL, params, {});
  },
};
export default TemplateService;
