import Cookies from 'universal-cookie';
import { storageKey } from 'utils/storageKey';
import { ADD_USER_INFO, REMOVE_USER_INFO } from '../constants';
const cookies = new Cookies();

const initialState = {
  authorized: cookies.get(storageKey.ACCESS_TOKEN) ? true : false,
  data: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_INFO:
      return {
        ...state,
        authorized: true,
        data: action.payload
      };
    case REMOVE_USER_INFO:
      localStorage.removeItem('username');
      cookies.remove(storageKey.ACCESS_TOKEN);
      
      return {
        authorized: false,
        data: null
      };

    default:
      return state;
  }
};
