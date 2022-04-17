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
  ADD_QUESTION_REQUEST,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAILURE,
} from "./userTypes";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [],
        error: "",
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loading: false,
        data: [],
        error: "",
      };
    case FETCH_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case FETCH_USER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case ADD_HEALTH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_HEALTH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case ADD_HEALTH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case ADD_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case ADD_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
