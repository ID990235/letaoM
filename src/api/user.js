import myaxios from './request'

export function fetchLogin(username, password) {
  return myaxios.post('/api/login', { username, password })
}

export function upload(formData) {
  return myaxios.post('/api/upload', formData)
}

export function fetchRegister(formData) {
  return myaxios.post('/api/register', formData)
}