// api
import { post } from '@/utils/request';

export const login = (data: any) => post<any>('/login', data);
