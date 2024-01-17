import { useQuery } from 'react-query';
import { deleteRequest, getServerRequest, postRequest, putRequest } from 'utils/http';


export const NewsService = {
  createCategory: function (data, successCallback, failCallback) {
    const URL = '/post/category/';
    return postRequest(URL, data, {}, successCallback, failCallback);
  },

  updateCategory: function (data, successCallback, failCallback) {
    const URL = `/post/category/${data.cateId}/`;
    return putRequest(URL, data, {}, successCallback, failCallback);
  },

  deleteCategory: function (data, successCallback, failCallback) {
    const URL = `/post/category/${data.cateId}/`;
    return deleteRequest(URL, data, {}, successCallback, failCallback);
  },

  createNews: function (data, successCallback, failCallback) {
    const URL = '/post/post/';
    return postRequest(URL, data, {}, successCallback, failCallback);
  },

  updateNews: function (data, successCallback, failCallback) {
    const URL = `/post/post/${data.id}/`;
    return putRequest(URL, data, {}, successCallback, failCallback);
  },

  deleteNews: function (data, successCallback, failCallback) {
    const URL = `/post/post/${data.id}/`;
    return deleteRequest(URL, data, {}, successCallback, failCallback);
  },

  uploadFile: function (file, successCallback, failCallback) {
    const URL = '/post/attachment/upload/';
    let formData = new FormData();
    formData.append("file", file);
    const config = { headers: { 'Content-Type': "multipart/form-data" } };
    return postRequest(URL, formData, config, successCallback, failCallback);
  },

  useGetCategory: function (params, options) {
    const URL = '/post/category/';
    return useQuery([URL, params], async () => {
      const res = await getServerRequest(URL, params);
      return res;
    }, { ...options, placeholderData: [] });
  },

  useGetNews: function (params, options) {
    const URL = '/post/post/';
    return useQuery([URL, params], async () => {
      const res = await getServerRequest(URL, params);
      return res;
    }, { ...options, placeholderData: [] });
  },

}

