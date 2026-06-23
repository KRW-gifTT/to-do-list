import http from './api'

export const updateProfile = async (data) => {
    return await http.put(`/api/v1/profile`, data)
}