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

export const getMyProfile = async () => {
    return await http.get(`/api/v1/auth/me`)
}

export const changePassword = async (data) => {
    return await http.put(`/api/v1/auth/change-password`, data)
}