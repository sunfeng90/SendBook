/*import {dispatch, store} from '../stores'*/
import axios from 'axios'
import config from '../config.js'

axios.defaults.timeout = 30 * 1000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * translate obj params to string with &
 * @param params
 * @returns {string}
 */
export function translateParams(params) {
  let url = ''
  for (let param in params) {
    url += `${param}=${encodeURIComponent(params[param])}&`
  }
  return url.substring(0, url.length - 1)
}

/*
 *发短信
 */
export const sendSms = async (params) => {
  let url = config.domain.sms + "/api/1/web/captcha/sms/freesend";
  let urlStr = url + `?${translateParams(params)}`
  let parameters = {
    url: urlStr,
    method: 'post'
  }
  let data = await axios.request(parameters)
  return data;
}

/*
 *手机号登录
 */
export const phoneLogin = async (params) => {
  let url = config.domain.service + "/api/1/welfare/user/info/web/add";
  let parameters = {
    url: url,
    method: 'post',
    data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}
