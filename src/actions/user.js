import { put, takeEvery, all, fork, call } from 'redux-saga/effects';
import axios from 'axios';

import { GET_ME_FAILURE, GET_ME_REQUEST, GET_ME_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS } from '../reducers/user';

function loginAPI(loginData) {
  return axios.post('/users/login', loginData);
}

function getMeAPI() {
  return axios.get('/users/me');
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
    })

  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE
    })
  }
}

function* getMe() {
  try {
    const result = yield call(getMeAPI);
    yield put({
      type: GET_ME_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error);
    yield put({
      type: GET_ME_FAILURE
    })
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function* watchGetMe() {
  yield takeEvery(GET_ME_REQUEST, getMe);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchGetMe),
  ])
}