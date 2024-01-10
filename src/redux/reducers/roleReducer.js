import { ADD_ROLES, REMOVE_ROLES } from '../constants';

const initialState = {
  data: null,
};

export function roleReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ROLES:
      return {
        ...state,
        data: action.payload
      };
    case REMOVE_ROLES:
      return {
        data: null
      };

    default:
      return state;
  }
};
