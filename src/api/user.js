import myaxios from './request'

export function fetchLogin(username, password) {
  return myaxios.post('/login', { username, password })
}

export function upload(formData) {
  return myaxios.post('/upload', formData)
}

export function fetchRegister(formData) {
  return myaxios.post('/register', formData)
}