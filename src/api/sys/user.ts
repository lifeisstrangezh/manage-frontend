import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  GetUserInfo = '/user/info',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  User = '/user',
}

export function getUserList(params) {
  return defHttp.get<GetUserInfoModel>({ url: Api.User, params }, { errorMessageMode: 'none' });
}

export function addUser(data) {
  return defHttp.post<GetUserInfoModel>({ url: Api.User, data });
}

export function editUser(data) {
  return defHttp.put<GetUserInfoModel>({ url: Api.User, data });
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.post(
    { url: Api.Logout },
    {
      // 登出请求无需自动重试：失败时往往 token 已失效，重试只会产生重复的 logout 请求
      retryRequest: { isOpenRetry: false, count: 5, waitTime: 100 },
    },
  );
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
