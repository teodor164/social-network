import * as axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  headers: {
    'API-KEY': '8a9d7844-8f01-425a-adf0-76c5abdfd30b',
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data)
  },
  unfollow(id) {
    return instance.delete(`follow/${id}`)
  },
  follow(id) {
    return instance.post(`follow/${id}`, {})
  },
}

export const authAPI = {
  auth() {
    return instance.get(`auth/me`)
  },
  login(email, password, rememberMe = false, captcha) {
    return instance.post(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    })
  },
  logout() {
    return instance.delete(`auth/login`)
  },
}

export const profileAPI = {
  getProfileInfo(userId) {
    return instance.get(`profile/${userId}`)
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },
  updateStatus(status) {
    return instance.put(`profile/status`, {
      status,
    })
  },
  savePhoto(photoFile) {
    let formData = new FormData()
    formData.append('image', photoFile)
    return instance.put(`profile/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  saveData(data) {
    return instance.put(`profile`, data)
  },
}

export const securityAPI = {
  getCaptcha() {
    return instance.get(`security/get-captcha-url`)
  },
}
