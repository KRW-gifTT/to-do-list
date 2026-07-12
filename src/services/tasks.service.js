import http from './api'

export const createTask = async (payload) => {
    return await http.post(`/api/v1/tasks`, payload)
}

export const getTask = async () => {
    return await http.get(`/api/v1/tasks`)
}

export const deleteTask = async (id) => {
    return await http.delete(`/api/v1/tasks/${id}`)
}

export const getTaskById = async (id) => {
    return await http.get(`/api/v1/tasks/${id}`)
}