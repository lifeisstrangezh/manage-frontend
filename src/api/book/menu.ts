import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetBookList = '/book',
}

export const getBookList = (params) => {
  return defHttp.get({ url: Api.GetBookList, params })
}
