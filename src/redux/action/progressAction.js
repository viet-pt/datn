import { SHOW_PROGRESS, HIDE_PROGRESS } from "redux/constants";

export const showProgressTurn = () => (dispatch) => {
  return dispatch({ 
    type: SHOW_PROGRESS
  })
}

export const hideProgressTurn = () => (dispatch) => {
  return dispatch({
    type: HIDE_PROGRESS
  })
}