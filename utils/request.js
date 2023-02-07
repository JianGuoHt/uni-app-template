import errorCode from './errorCode';
import { clearLoginInfo } from './auth';
import { formatDataByQuery } from '@/utils/index.js';
import { getConfig } from '../config';

/**
 * 网络请求
 * @param {object} params 网络请求配置
 * @param {string} params.url 请求地址
 * @param {[object, string, ArrayBuffer]} params.data 请求数据
 * @param {string} params.method 请求方法
 * @param {object} params.params query请求参数
 * @returns
 */
function request(
  params = {
    url: null,
    data: null,
    method: null,
    header: {},
    params: {},
  },
) {
  // 请求服务器地址
  const baseUrl = params.url.match(/http:\/\/|https:\/\//g) ? '' : getConfig().BASE_URL;
  // 白名单（将不会配置鉴权信息"Authorization"）
  const whiteList = ['/resetPasswords', '/applet/mobileLogin'];
  // method 的合法值
  const methods = {
    options: 'OPTIONS',
    get: 'GET',
    head: 'HEAD',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE',
    trace: 'TRACE',
    connect: 'CONNECT',
  };
  // 传入小写 自动转大写
  const method = methods[params.method] || params.method;
  // 获取token
  const Authorization = uni.getStorageSync('token');
  // 请求头
  let header = {
    'content-type': 'application/json',
    // 白名单列表中的接口不配置token
    Authorization: whiteList.includes(params.url) ? '' : Authorization,
  };

  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + params.url + (params.params ? formatDataByQuery(params.params) : ''),
      data: params.data,
      header: Object.assign(header, params.header),
      method,
      dataType: 'json',
      responseType: 'text',
      // 接口调用成功的回调函数
      success: (result) => {
        // 未设置状态码则默认成功状态
        const code = result.data.code || result.statusCode || 200;
        // 后台返回的错误信息
        const backErr = result.data.msg || '';
        // 是否为后台代码出错 （后台返回代码错误关键字正则）
        const isCodeError = !backErr || !!backErr.match(/sql|java|error/gi);
        // 获取错误信息
        const msg = errorCode[code] || (isCodeError ? errorCode['default'] : backErr);
        if (code === 401) {
          uni.showToast({
            title: msg,
            icon: 'error',
            complete() {
              // 清除登录信息
              clearLoginInfo();
              // 转到登陆页面
              uni.reLaunch({
                url: '/pages/login/login',
              });
            },
          });
        } else if (code !== 200 && code !== 201) {
          uni.showToast({
            icon: 'error',
            title: msg,
          });
          reject(result.data);
        } else {
          resolve(result.data);
        }
      },
      // 接口调用失败的回调函数
      fail: (err) => {
        reject(err);
      },
    });
  });
}

/**
 * get 请求
 * @param {string} url 请求地址
 * @param {object} data 请求参数
 * @returns
 */
request.get = function get(url, data) {
  return this({
    url,
    data,
    method: 'GET',
  });
};

/**
 * post 请求
 * @param {string} url 请求地址
 * @param {object} data 请求参数
 * @param {object} params query请求参数
 * @returns
 */
request.post = function get(url, data, params) {
  return this({
    url,
    data,
    method: 'POST',
    params,
  });
};

/**
 * put 请求
 * @param {string} url 请求地址
 * @param {object} data 请求参数
 * @param {object} params query请求参数
 * @returns
 */
request.put = function get(url, data, params) {
  return this({
    url,
    data,
    method: 'PUT',
    params,
  });
};

export default request;
