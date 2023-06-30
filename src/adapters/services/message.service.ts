import API from "src/constants/api";
import { postWithPath } from "src/utils/http";

const MessageService = {
  sendZNS: (data) => {
    return postWithPath(API.TEMPLATE.GET.LIST, {}, data);
  },
};
export default MessageService;
