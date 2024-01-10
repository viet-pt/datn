import { ADD_USER_INFO, REMOVE_USER_INFO } from "redux/constants";

export const fetchUser = (data) => dispatch => {
  dispatch({
    type: ADD_USER_INFO,
    payload: data
  })
}

export const removeUser = () => dispatch => {
  dispatch({
    type: REMOVE_USER_INFO
  })
}
