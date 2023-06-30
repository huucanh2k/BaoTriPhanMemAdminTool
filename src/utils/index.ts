export const buildParams = (data?: any) => {
  if (data) {
    const dataEdited = {
      ...data,
    };

    let queryData: any = {};
    try {
      queryData = Object.fromEntries(
        Object.entries(dataEdited).filter(
          ([_, v]) => v != null && v !== "" && v !== -1
        )
      );
    } catch (err) {
      console.error("Có lỗi xảy ra: ", err);
    }

    return Object.keys(queryData)
      .map((key) => {
        if (Array.isArray(queryData[key])) {
          return `${key}=[${queryData[key]}]`;
        }
        if (typeof queryData[key] === "object") {
          return `${key}=${JSON.stringify(queryData[key])}`;
        }
        return `${key}=${encodeURIComponent(queryData[key])}`;
      })
      .join("&");
  }
  return "";
};
export const buildURLWithParam = (url: string, query?: any) => {
  return url + "?" + buildParams(query);
};

export function extend(obj1, obj2) {
  return { ...obj1, ...obj2 };
}
