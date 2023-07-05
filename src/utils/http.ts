import { buildURLWithParam, extend } from "./index"
import { DOMAIN_API_URL } from "src/constants/"

export function fetch(url, params?: {}, options?: {}, timeOut?: 10) {
  const exOptions = extend(
    {
      headers: {
        access_token:
          "G_lf8xsJ4bf0-EGbkfKLM4VsxoUxWni9IBJk4R63HmmoiSDtazfj1176x2-WmcOKBl362vp5G2LYzhGWtfG16YM0ZHsvYZSYBUZD2xRIMmqDml4MbVHsFXcOupRacamJ6vxU0uVzUpmDoO07iFvt00phrNEY-YuDBPEvBgkH3oCaa8S8jw0yEYwrgmAkeY9v0TI6HB_CTpqQmOCXel8t8Z7gkLpBuHXpSF7ZMitvSM1GzULGh-1GJ0tZsdAZw7nE0jZ9HQ6qONyXcSH4cQ1qPGkMv6MMYcv32v_QIe_oAsWfxfXsk-yfI17zWLk8qIHGET-gKw3Y6czUYRn0p9LEEijRmqgyZXXO",
      },
    },
    options
  )

  return window.fetch(buildURLWithParam(url, params), exOptions).then(toJson)
}

export const getWithPath = (
  path: string,
  params?: {},
  options?: {},
  timeOut?: 10
) => {
  return getWithUrl(DOMAIN_API_URL + path, params, options, timeOut)
}

export const getWithUrl = (
  url: string,
  params?: {},
  options?: {},
  timeOut?: 10
) => {
  return fetch(url, params, options, timeOut)
}

export const getUrlFromPath = (path, params) => {
  return buildURLWithParam(DOMAIN_API_URL + path, params)
}

export const post = (
  url,
  params = {},
  data: any = {},
  options: any = {},
  timeOut
) => {
  return fetch(
    url,
    params,
    extend({ body: JSON.stringify(data) }, options),
    timeOut
  )
}

export const postWithUrlBinary = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  const formData = new FormData()
  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key])
    }
  }
  return fetch(
    url,
    params,
    extend({ body: formData, method: "POST" }, options),
    timeOut
  )
}

export const postWithPath = (
  path,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return postWithUrl(DOMAIN_API_URL + path, params, data, options, timeOut)
}

export const putWithPath = (
  path,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return putWithUrl(DOMAIN_API_URL + path, params, data, options, timeOut)
}

export const postWithUrl = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return post(url, params, data, extend({ method: "POST" }, options), timeOut)
}

export const putWithUrl = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return post(url, params, data, extend({ method: "PUT" }, options), timeOut)
}

function toJson(resp) {
  if (resp.ok) {
    return resp.json()
  }

  //return Promise.reject(resp);
}
