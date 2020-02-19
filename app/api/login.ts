import request, { ApiResponse } from './request';

export const login = (username:string,password:string) => {
    return request.post<any,ApiResponse>('/admin/login', {
        username,
        password
    });
}