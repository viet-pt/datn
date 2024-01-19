import { useQuery } from 'react-query';
import { deleteRequest, getServerRequest, postRequest, putRequest } from 'utils/http';


export const QuizService = {
  createCategory: function (data, successCallback, failCallback) {
    const URL = '/question/category/';
    return postRequest(URL, data, {}, successCallback, failCallback);
  },

  updateCategory: function (data, successCallback, failCallback) {
    const URL = `/question/category/${data.cateId}/`;
    return putRequest(URL, data, {}, successCallback, failCallback);
  },

  deleteCategory: function (data, successCallback, failCallback) {
    const URL = `/question/category/${data.cateId}/`;
    return deleteRequest(URL, data, {}, successCallback, failCallback);
  },

  createQuiz: function (data, successCallback, failCallback) {
    const URL = '/question/question/';
    return postRequest(URL, data, {}, successCallback, failCallback);
  },

  updateQuiz: function (data, successCallback, failCallback) {
    const URL = `/question/question/${data.id}/`;
    return putRequest(URL, data, {}, successCallback, failCallback);
  },

  deleteQuiz: function (data, successCallback, failCallback) {
    const URL = `/question/question/${data.id}/`;
    return deleteRequest(URL, data, {}, successCallback, failCallback);
  },

  useGetCategory: function (params, options) {
    const URL = '/question/category/';
    return useQuery([URL, params], async () => {
      const res = await getServerRequest(URL, params);
      return res;
    }, { ...options, placeholderData: [] });
  },

  useGetQuiz: function (params, options) {
    const URL = '/question/question/';
    return useQuery([URL, params], async () => {
      const res = await getServerRequest(URL, params);
      return res;
    }, { ...options, placeholderData: [] });
  },

  useStatisticQuiz: function (params, options) {
    const URL = '/post/post/statistic/';
    return useQuery([URL, params], async () => {
      const res = await getServerRequest(URL, params);
      return res;
    }, { ...options, placeholderData: [] });
  },

}

