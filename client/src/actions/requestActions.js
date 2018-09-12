import axios from "axios";

import {
  GET_REQUEST,
  GET_REQUESTS,
  REQUEST_LOADING,
  CLEAR_CURRENT_REQUEST,
  GET_ERRORS
} from "./types";

// Get current request
export const getCurrentRequest = () => dispatch => {
  dispatch(setRequestLoading());
  axios
    .get("/api/requests/user")
    .then(res =>
      dispatch({
        type: GET_REQUEST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REQUEST,
        payload: {}
      })
    );
};

// Get all requests
export const getRequests = () => dispatch => {
  dispatch(setRequestLoading());
  axios
    .get("/api/requests/")
    .then(res =>
      dispatch({
        type: GET_REQUESTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REQUESTS,
        payload: err.response.data
      })
    );
};

// Create request
export const createNewRequest = (requestData, history) => dispatch => {
  axios
    .post("/api/requests/feedback", requestData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Request loading
export const setRequestLoading = () => {
  return {
    type: REQUEST_LOADING
  };
};

// Clear request
// Request loading
export const clearCurrentRequest = () => {
  return {
    type: CLEAR_CURRENT_REQUEST
  };
};
