import Axios from "axios";
import { cui, Notification } from 'components/common';
import Cookies from 'universal-cookie';
import { initializeStore } from './../redux';
import { storageKey } from "./storageKey";
const cookies = new Cookies();
const https = require('https');

Axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: 300000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Osc-Render": "next",
  },
});

function getToken() {
  let token = cookies.get(storageKey.ACCESS_TOKEN);
  return token;
}

axios.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

function handleHttpError(error) {
  if (error.response && error.response.data) {
    return error.response.data.errorMessage || error;
  }
  return error;
}

function logout(store) {
  cookies.remove(storageKey.ACCESS_TOKEN);
  Notification.error('Phiên làm việc đã hết hạn, Vui lòng đăng nhập lại');
  store.dispatch({ type: 'REMOVE_USER_INFO' });
}

function makeHttpRequest(apiCall, successCallBack, failCallBack, transformFunc) {
  const store = initializeStore();
  store.dispatch({ type: 'SHOW_PROGRESS' });
  const state = store.getState();

  return new Promise(async () => {
    try {
      const response = await apiCall();
      store.dispatch({ type: 'HIDE_PROGRESS' });
      if (response?.data?.errorCode === 403 && state?.userReducer?.authorized) {
        logout(store);
        return;
      }
      const responseData = response.data;
      const successResponse = cui.isFunction(transformFunc) ? transformFunc(responseData) : responseData;
      successCallBack(successResponse);
    } catch (e) {
      store.dispatch({ type: 'HIDE_PROGRESS' });
      if (e?.response?.status === 401) {
        logout(store);
      }
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
      if (response?.data?.errorCode === 403 && state?.userReducer?.authorized) {
        logout(store);
        return;
      }
      const responseData = response.data;
      const successResponse = cui.isFunction(transformFunc) ? transformFunc(responseData) : responseData;
      successCallBack(successResponse);
    } catch (e) {
      if (e?.response?.status === 401) {
        logout(store);
      }
      if (cui.isFunction(failCallBack)) {
        failCallBack(handleHttpError(e));
      }
    }
  });
}

export async function getServerRequest(url, config = {}) {
  const store = initializeStore();
  store.dispatch({ type: 'SHOW_PROGRESS' });
  try {
    store.dispatch({ type: 'HIDE_PROGRESS' });
    const responseData = await axios.get(url, config);
    return responseData.data;
  } catch (error) {
    store.dispatch({ type: 'HIDE_PROGRESS' });
    if (error?.response?.status === 401) {
      logout(store);
    }
    return error?.response?.data;
  }
}

export async function postServerRequest(url, data, config = { withCredentials: true }) {
  const store = initializeStore();
  store.dispatch({ type: 'SHOW_PROGRESS' });
  const state = store.getState();

  try {
    const response = await axios.post(url, data, config);
    store.dispatch({ type: 'HIDE_PROGRESS' });
    if (response?.data?.errorCode === 403 && state?.userReducer?.authorized) {
      logout(store);
      return;
    }
    return response.data;
  } catch (error) {
    console.log('error', error);
    store.dispatch({ type: 'HIDE_PROGRESS' });
    if (error?.response?.status === 401) {
      logout(store);
    }
    return error?.response?.data;
  }
}

export async function putServerRequest(url, data, config = {}) {
  const store = initializeStore();
  store.dispatch({ type: 'SHOW_PROGRESS' });
  const state = store.getState();

  try {
    const response = await axios.put(url, data, config);
    store.dispatch({ type: 'HIDE_PROGRESS' });
    if (response?.data?.errorCode === 403 && state?.userReducer?.authorized) {
      logout(store);
      return;
    }
    return response.data;
  } catch (error) {
    store.dispatch({ type: 'HIDE_PROGRESS' });
    if (error?.response?.status === 401) {
      logout(store);
    }
    return error?.response?.data;
  }
}

export function getRequest(url, config = {}, successCallBack, failCallBack, transformFunc) {
  return makeHttpRequest(() => axios.get(url, config), successCallBack, failCallBack, transformFunc);
}

export function postRequest(url, data, config = {}, successCallBack, failCallBack, transformFunc) {
  return makeHttpRequest(() => axios.post(url, data, config), successCallBack, failCallBack, transformFunc);
}

export function postRequestNoLoading(url, data, config = {}, successCallBack, failCallBack, transformFunc) {
  return makeHttpRequestNoLoading(() => axios.post(url, data, config), successCallBack, failCallBack, transformFunc);
}

export function putRequest(url, data, config = {}, successCallBack, failCallBack) {
  return makeHttpRequest(() => axios.put(url, data, config), successCallBack, failCallBack);
}

export function deleteRequest(url, data, config = {}, successCallBack, failCallBack) {
  return makeHttpRequest(() => axios.delete(url, data, config), successCallBack, failCallBack);
}
