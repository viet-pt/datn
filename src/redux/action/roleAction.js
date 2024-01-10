import { ADD_ROLES, REMOVE_ROLES } from "redux/constants";

export const fetchRoles = (data) => dispatch => {
  dispatch({
    type: ADD_ROLES,
    payload: data
  })
}

export const removeRoles = () => dispatch => {
  dispatch({
    type: REMOVE_ROLES
  })
}
