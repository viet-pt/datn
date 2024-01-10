import { ADD_PROJECT_INFO, REMOVE_PROJECT_INFO } from '../constants';

const initialState = { 
  data: null
};

export function projectReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT_INFO:
      return {
        ...state,
        data: action.payload
      };
    case REMOVE_PROJECT_INFO:
      return {
        data: null
      };

    default:
      return state;
  }
};
