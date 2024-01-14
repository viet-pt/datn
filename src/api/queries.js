
import { useQuery } from 'react-query';
import { postServerRequest } from 'utils/http';

export const Queries = {
  useGetUserInfo: function (params, options) {
    const URL = '/user_admin/user/get_info';
    return useQuery([URL, params], async () => {
      const res = await postServerRequest(URL, params);
      return res;
    }, { ...options, placeholderData: '' });
  },

}