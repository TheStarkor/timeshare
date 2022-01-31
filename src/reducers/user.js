const initialState = {
  data: null,
  isLogging: false,
  loginSuccess: true,
  loading: false
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const GET_ME_REQUEST = 'GET_ME_REQUEST';
export const GET_ME_SUCCESS = 'GET_ME_SUCCESS';
export const GET_ME_FAILURE = 'GET_ME_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLogging: true,
        loginSuccess: true,
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        data: action.data.user,
        token: action.data.token,
        isLogging: false,
        loginSuccess: true,
      }
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLogging: false,
        loginSuccess: false,
      }
    case GET_ME_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ME_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    case GET_ME_FAILURE:
      return {
        ...state,
        loading: false,
      }
    case LOG_OUT_REQUEST:
      return initialState
    default:
      return state;
  }
}

export default reducer;