import { all, fork } from 'redux-saga/effects';

import user from './user';
import posts from './posts';

export default function* rootSaga() {
  yield all([
    fork(user),
    fork(posts),
  ])
}