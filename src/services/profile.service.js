import http from './api'

export const updateProfile = async (data) => {
    return await http.put(`/api/v1/profile`, data)
}

export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await http.post("/api/v1/profile/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};