import { ADD_PROJECT_INFO, REMOVE_PROJECT_INFO } from "redux/constants";

export const fetchProject = (data) => dispatch => {
  dispatch({
    type: ADD_PROJECT_INFO,
    payload: data
  })
}

export const removeProject = () => dispatch => {
  dispatch({
    type: REMOVE_PROJECT_INFO
  })
}
