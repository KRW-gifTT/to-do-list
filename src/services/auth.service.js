import http from './api'

export const login = async (payload) => {
    return await http.post(`/api/v1/auth/login`, payload)
}

export const logout = async (payload) => {
    return await http.post(`/api/v1/auth/logout`, payload)
}

export const register = async (payload) => {
    return await http.post(`/api/v1/auth/register`, payload)
}
