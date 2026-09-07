import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/menu',
  RolePageList = '/role',
  GetAllRoleList = '/system/getAllRoleList',
  createRole = '/role',
  addRoleMenu = '/role/role_menu',
  AuthList = '/permission',
  RoleAuth = '/role/role_auth'
}

export const deleteAuth = (params) =>
  defHttp.delete<AccountListGetResultModel>({ url: Api.AuthList, params });

export const addAuth = (data) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.AuthList, data });
export const editAuth = (data) =>
  defHttp.put<AccountListGetResultModel>({ url: Api.AuthList, data });

export const addRoleAuth = (data) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.RoleAuth, data });

export const getRoleAuthByRoleId = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RoleAuth, params });

export const getAuthList = (params) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AuthList, params });

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const createRole = (params?: RolePageParams) =>
  defHttp.post<RolePageListGetResultModel>({ url: Api.createRole, params });

export const editRole = (params?: RolePageParams) =>
  defHttp.put<RolePageListGetResultModel>({ url: Api.createRole, params });

export const addRoleMenu = (params?: RolePageParams) =>
  defHttp.post<RolePageListGetResultModel>({ url: Api.addRoleMenu, params });

export const getRoleMenu = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.addRoleMenu, params });
  
export const deleteRoleMenu = (data?: RolePageParams) =>
  defHttp.delete<RolePageListGetResultModel>({ url: Api.addRoleMenu, data });
  
export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
