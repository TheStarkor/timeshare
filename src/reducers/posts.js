const initialState = {
  data: null,
  loadingSuccess: true,
  loading: false
};

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        loadingSuccess: true,
      }
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        loadingSuccess: true,
      }
    case GET_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        loadingSuccess: false,
      }
    default:
      return state;
  }
}

export default reducer;