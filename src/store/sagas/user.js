import { takeLatest, call, put, fork } from "redux-saga/effects";

import {
  getUserSuccess,
  getUserStarredSuccess,
  getUserReposSuccess,
  toggleAlert,
  getUserFail,
  getUserReposFail,
  getUserStarredFail
} from "../actions";

import { 
  USER_GET_DATA,
  USER_GET_DATA_STARRED,
  USER_GET_DATA_REPOS
} from "../actions/types";

import { 
  getUser, getUserRepos,
  getUserStarred
} from "../apis";

function* getUserSaga(obj) {
  try {
    const res = yield call(getUser, obj.payload);
    if (!res) {
      yield put(getUserFail());
      yield put(
        toggleAlert(true, {
          message: "Erro ao buscar os dados",
        })
      );
    } else {
      yield put(
        getUserSuccess({
          payload: res,
        })
      );

      if (obj.resolve) obj.resolve(res);
    }
  } catch (error) {}
}

function* watchGetUserSaga() {
  yield takeLatest(USER_GET_DATA, getUserSaga);
}

function* getUserReposSaga(obj) {
  try {
    const res = yield call(getUserRepos, obj.payload);
    if (!res) {
      yield put(getUserReposFail());
      yield put(
        toggleAlert(true, {
          message: "Erro ao buscar os dados dos repositórios",
        })
      );
    } else {
      yield put(
        getUserReposSuccess({
          payload: res,
        })
      );

      if (obj.resolve) obj.resolve(res);
    }
  } catch (error) {}
}

function* watchGetUserReposSaga() {
  yield takeLatest(USER_GET_DATA_REPOS, getUserReposSaga);
}

function* getUserStarredSaga(obj) {
  try {
    const res = yield call(getUserStarred, obj.payload);
    if (!res) {
      yield put(getUserStarredFail());
      yield put(
        toggleAlert(true, {
          message: "Erro ao buscar os dados de starreds",
        })
      );
    } else {
      yield put(
        getUserStarredSuccess({
          payload: res,
        })
      );

      if (obj.resolve) obj.resolve(res);
    }
  } catch (error) {}
}

function* watchGetUserStarredSaga() {
  yield takeLatest(USER_GET_DATA_STARRED, getUserStarredSaga);
}


const userSagas = [
  fork(watchGetUserSaga),
  fork(watchGetUserReposSaga),
  fork(watchGetUserStarredSaga),
];

export default userSagas