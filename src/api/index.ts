// api
import { post } from '@/utils/request';

/** 登录 */
export const login = (data: any) => post<any>('/login', data);
