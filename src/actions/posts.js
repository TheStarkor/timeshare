import { put, takeEvery, all, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import { GET_POSTS_FAILURE, GET_POSTS_REQUEST, GET_POSTS_SUCCESS } from '../reducers/posts';

function getPostsAPI() {
  return axios.get('/posts');
}

function* getPosts() {
  try {
    const result = yield call(getPostsAPI);
    yield put({
      type: GET_POSTS_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error);
    yield put({
      type: GET_POSTS_FAILURE
    })
  }
}

function* watchPosts() {
  yield takeEvery(GET_POSTS_REQUEST, getPosts);
}

export default function* userSaga() {
  yield all([
    fork(watchPosts),
  ])
}