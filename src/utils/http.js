import axios from 'axios';
import { cui, Notification } from 'components/common';
import { initializeStore } from './../redux';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const https = require('https');
axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000;

function handleHttpError(error) {
  if (error.response && error.response.data) {
    return error.response.data.errorMessage || error;
  }
  return error;
}

function transformConfig(config) {
  const token = cookies.get('token') || '';
  const requestTime = Date.now();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    RequestTime: requestTime,
    ...config.headers,
  };

  config.headers = headers;
  config.timeout = 30000;
  return config;
}

function makeHttpRequest(apiCall, successCallBack, failCallBack, transformFunc) {
  const store = initializeStore();
  store.dispatch({ type: 'SHOW_PROGRESS' });
  const state = store.getState();

  return new Promise(async () => {
    try {
      const response = await apiCall();
      store.dispatch({ type: 'HIDE_PROGRESS' });
      if (response?.data?.errorCode === 1001 && state?.userReducer?.authorized) {
        Notification.error('Phiên làm việc đã hết hạn, Vui lòng đăng nhập lại');
        // store.dispatch({ type: 'REMOVE_USER_INFO' }); // fake
        return;
      }
      const responseData = response.data;
      const successResponse = cui.isFunction(transformFunc) ? transformFunc(responseData) : responseData;
      successCallBack(successResponse);
    } catch (e) {
      store.dispatch({ type: 'HIDE_PROGRESS' });
      if (cui.isFunction(failCallBack)) {
        failCallBack(handleHttpError(e));
      }
    }
  });
}

function makeHttpRequestNoLoading(apiCall, successCallBack, failCallBack, transformFunc) {
  const store = initializeStore();
  const state = store.getState();

  return new Promise(async () => {
    try {
      const response = await apiCall();
      if (response?.data?.errorCode === 1001 && state?.userReducer?.authorized) {
        Notification.error('Phiên làm việc đã hết hạn, Vui lòng đăng nhập lại');
        store.dispatch({ type: 'REMOVE_USER_INFO' });
        return;
      }
      const responseData = response.data;
      const successResponse = cui.isFunction(transformFunc) ? transformFunc(responseData) : responseData;
      successCallBack(successResponse);
    } catch (e) {
      if (cui.isFunction(failCallBack)) {
        failCallBack(handleHttpError(e));
      }
    }
  });
}

export async function getServerRequest(url, config = {}) {
  transformConfig(config);
  const store = initializeStore();
  store.dispatch({ type: 'SHOW_PROGRESS' });
  try {
    store.dispatch({ type: 'HIDE_PROGRESS' });
    const responseData = await axios.get(url, config);
    return responseData.data;
  } catch (error) {
    store.dispatch({ type: 'HIDE_PROGRESS' });
    return error?.response?.data;
  }
}

export async function postServerRequest(url, data, config = {}) {
  const store = initializeStore();
  store.dispatch({ type: 'SHOW_PROGRESS' });
  const state = store.getState();
  transformConfig(config);

  try {
    const response = await axios.post(url, data, config);
    store.dispatch({ type: 'HIDE_PROGRESS' });
    if (response?.data?.errorCode === 1001 && state?.userReducer?.authorized) {
      Notification.error('Phiên làm việc đã hết hạn, Vui lòng đăng nhập lại');
      store.dispatch({ type: 'REMOVE_USER_INFO' });
      return;
    }
    return response.data;
  } catch (error) {
    store.dispatch({ type: 'HIDE_PROGRESS' });
    return error?.response?.data;
  }
}

export async function putServerRequest(url, data, config = {}) {
  const store = initializeStore();
  store.dispatch({ type: 'SHOW_PROGRESS' });
  const state = store.getState();
  transformConfig(config);

  try {
    const response = await axios.put(url, data, config);
    store.dispatch({ type: 'HIDE_PROGRESS' });
    if (response?.data?.errorCode === 1001 && state?.userReducer?.authorized) {
      Notification.error('Phiên làm việc đã hết hạn, Vui lòng đăng nhập lại');
      store.dispatch({ type: 'REMOVE_USER_INFO' });
      return;
    }
    return response.data;
  } catch (error) {
    store.dispatch({ type: 'HIDE_PROGRESS' });
    return error?.response?.data;
  }
}

export function getRequest(url, config = {}, successCallBack, failCallBack, transformFunc) {
  transformConfig(config);
  return makeHttpRequest(() => axios.get(url, config), successCallBack, failCallBack, transformFunc);
}

export function postRequest(url, data, config = {}, successCallBack, failCallBack, transformFunc) {
  data.access_token = cookies.get('token') || '';
  transformConfig(config);
  return makeHttpRequest(() => axios.post(url, data, config), successCallBack, failCallBack, transformFunc);
}

export function postRequestNoLoading(url, data, config = {}, successCallBack, failCallBack, transformFunc) {
  data.access_token = cookies.get('token') || '';
  transformConfig(config);
  return makeHttpRequestNoLoading(() => axios.post(url, data, config), successCallBack, failCallBack, transformFunc);
}

export function putRequest(url, data, config = {}, successCallBack, failCallBack) {
  transformConfig(config);
  return makeHttpRequest(() => axios.put(url, data, config), successCallBack, failCallBack);
}

export function deleteRequest(url, data, config = {}, successCallBack, failCallBack) {
  transformConfig(config);
  return makeHttpRequest(() => axios.delete(url, data, config), successCallBack, failCallBack);
}
