import { buildURLWithParam, extend } from "./index";
import { DOMAIN_API_URL } from "src/constants/";

export function fetch(url, params?: {}, options?: {}, timeOut?: 10) {
  const exOptions = extend(
    {
      headers: {
        access_token:
          "8BtoLOV-b44ZllzJWFYJGoImz561xj8U9REq2k-bYtSEXe8b-e2LDoc1_cYMYDC1Kw33TRIHyZfUbfLAdDIc06B7a4k_xfed6l-8HC7GfJegywbb_BUWDm6bkYMdXODE1v6lKDsGkJrzXwnmcxAL1doCYKQMjAOtNlQKMvlif3a_qOfQcykV97hie6-Xhf4ULgUCJx2bXGzmWAqPfP6M1dROacwcyei1RTYFKvlikH8_xz15rVVA6nJHzcFBZF8e5htXIyMgvmOagzKMq9_gVWEvp1hV_y1E1zN_FCVNrcCdwiCXsTtbFtcOt52WkQyUHO65O9_1cYPwm896ad1U9uRZdaC",
      },
    },
    options
  );

  return window.fetch(buildURLWithParam(url, params), exOptions).then(toJson);
}

export const getWithPath = (
  path: string,
  params?: {},
  options?: {},
  timeOut?: 10
) => {
  return getWithUrl(DOMAIN_API_URL + path, params, options, timeOut);
};

export const getWithUrl = (
  url: string,
  params?: {},
  options?: {},
  timeOut?: 10
) => {
  return fetch(url, params, options, timeOut);
};

export const getUrlFromPath = (path, params) => {
  return buildURLWithParam(DOMAIN_API_URL + path, params);
};

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
  );
};

export const postWithUrlBinary = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  const formData = new FormData();
  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  return fetch(
    url,
    params,
    extend({ body: formData, method: "POST" }, options),
    timeOut
  );
};

export const postWithPath = (
  path,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return postWithUrl(DOMAIN_API_URL + path, params, data, options, timeOut);
};

export const putWithPath = (
  path,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return putWithUrl(DOMAIN_API_URL + path, params, data, options, timeOut);
};

export const postWithUrl = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return post(url, params, data, extend({ method: "POST" }, options), timeOut);
};

export const putWithUrl = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return post(url, params, data, extend({ method: "PUT" }, options), timeOut);
};

function toJson(resp) {
  if (resp.ok) {
    return resp.json();
  }

  //return Promise.reject(resp);
}
