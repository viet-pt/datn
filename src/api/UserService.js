import { useQuery } from 'react-query';
import { deleteRequest, getServerRequest, postServerRequest } from 'utils/http';

export const UserService = {
  login: async function (data) {
    const URL = '/user/login/';
    return await postServerRequest(URL, data);
  },

  deleteAccount: function (data, successCallback, failCallback) {
    const URL = `/user/user/${data.id}/`;
    return deleteRequest(URL, data, {}, successCallback, failCallback);
  },

  useGetAccount: function (params, options) {
    const URL = '/user/user/';
    return useQuery([URL, params], async () => {
      const res = await getServerRequest(URL, params);
      return res;
    }, { ...options, placeholderData: [] });
  },

  useGetStatistic: function (params, options) {
    const URL = '/user/statistic/';
    return useQuery([URL, params], async () => {
      const res = await getServerRequest(URL, params);
      return res;
    }, { ...options, placeholderData: {} });
  },


}

