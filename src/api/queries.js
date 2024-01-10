
import { useQuery } from 'react-query';
import { getServerRequest, postServerRequest } from 'utils/http';
import { CommonService } from './CommonService';
import { STATUS } from 'constants/constants';

const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api`;

function getConvertStatusOrder(status) {
  switch (status) {
    case 1:
      return STATUS.INIT;
    case 2:
      return STATUS.START;
    case 3:
      return STATUS.PENDING;
    case 4:
      return STATUS.INPROGRESS;
    case 5:
      return STATUS.COMPLETE;
    case 6:
      return STATUS.PARTITAL;
    case 7:
      return STATUS.PROCESSING;
    case 8:
      return STATUS.CANCELED;
    default:
      return STATUS.INIT;
  }
}

function transformOrderList(res) {
  if (res?.errorCode === 0) {
    res.data.forEach((item, index) => {
      item.index = index + 1;
      item.convertCreateTime = CommonService.getCovertedTime(item.createTime, 'DD/MM/YY hh:mm');
      item.convertStatus = getConvertStatusOrder(item.status);
    });
  }
  return res;
}

export const Queries = {
  useGetOrder: function (params, options) {
    const URL = `${baseURL}/cms/getAllOrder`;
    return useQuery([URL, params], async () => {
      const res = await getServerRequest(URL, params);
      return transformOrderList(res);
    }, { ...options, placeholderData: [] });
  },

  useGetUserInfo: function (params, options) {
    const URL = `${baseURL}/user_admin/user/get_info`;
    return useQuery([URL, params], async () => {
      const res = await postServerRequest(URL, params);
      return res;
    }, { ...options, placeholderData: '' });
  },

}