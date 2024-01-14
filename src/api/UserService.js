import { postServerRequest } from 'utils/http';

const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const UserService = {
  login: async function (data) {
    const URL = '/user/login/';
    return await postServerRequest(URL, data);
  },

  updateStatusOrder: async function (data) {
    const URL = `${baseURL}/updateStatusOrder`;
    return await postServerRequest(URL, data);
  },


}

