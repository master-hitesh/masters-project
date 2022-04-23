import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
  ADD_HEALTH_DATA_REQUEST,
  ADD_HEALTH_DATA_SUCCESS,
  ADD_HEALTH_DATA_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "./userTypes";
import axios from "axios";
import { baseURL } from "../../shared/BaseURL";

export const registerUserRequest = () => {
  return {
    type: REGISTER_USER_REQUEST,
  };
};

export const registerUserSuccess = (data) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: data,
  };
};

export const registerUserFailure = (error) => {
  return {
    type: REGISTER_USER_FAILURE,
    payload: error,
  };
};

export const registerUser = (userObj) => {
  return (dispatch) => {
    dispatch(registerUserRequest());
    axios
      .post(baseURL + "signup", userObj)
      .then((response) => {
        const data = response.data;
        dispatch(registerUserSuccess(data));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(registerUserFailure(error.message));
      });
  };
};

export const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST,
  };
};

export const loginUserSuccess = (data) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
};

export const loginUserFailure = (error) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error,
  };
};

export const loginUser = (userObj) => {
  return (dispatch) => {
    dispatch(loginUserRequest());
    axios
      .post(baseURL + "signin", userObj)
      .then((response) => {
        const data = response.data;
        dispatch(loginUserSuccess(data));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(loginUserFailure(error.message));
      });
  };
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const fetchUserDataRequest = () => {
  return {
    type: FETCH_USER_DATA_REQUEST,
  };
};

export const fetchUserDataSuccess = (data) => {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchUserDataFailure = (error) => {
  return {
    type: FETCH_USER_DATA_FAILURE,
    payload: error,
  };
};

export const fetchUserData = (userObj) => {
  return (dispatch) => {
    dispatch(fetchUserDataRequest());
    axios
      .post(baseURL + "userid", userObj)
      .then((response) => {
        const data = response.data;
        dispatch(fetchUserDataSuccess(data));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchUserDataFailure(error.message));
      });
  };
};

export const addHealthDataRequest = () => {
  return {
    type: ADD_HEALTH_DATA_REQUEST,
  };
};

export const addHealthDataSuccess = (data) => {
  return {
    type: ADD_HEALTH_DATA_SUCCESS,
    payload: data,
  };
};

export const addHealthDataFailure = (error) => {
  return {
    type: ADD_HEALTH_DATA_FAILURE,
    payload: error,
  };
};

export const addHealthData = (userObj) => {
  return (dispatch) => {
    dispatch(addHealthDataRequest());
    axios
      .post(baseURL + "addSymptom", userObj)
      .then((response) => {
        const data = response.data;
        dispatch(addHealthDataSuccess(data));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(addHealthDataFailure(error.message));
      });
  };
};

export const addCommentRequest = () => {
  return {
    type: ADD_COMMENT_REQUEST,
  };
};

export const addCommentSuccess = (data) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    payload: data,
  };
};

export const addCommentFailure = (error) => {
  return {
    type: ADD_COMMENT_FAILURE,
    payload: error,
  };
};

export const addComment = (userObj) => {
  return (dispatch) => {
    dispatch(addCommentRequest());
    axios
      .post(baseURL + "addComment", userObj)
      .then((response) => {
        const data = response.data;
        dispatch(addCommentSuccess(data));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(addCommentFailure(error.message));
      });
  };
};
