import myaxios from './request'

export function fetchAddUserAddress(user_id, formData) {
  return myaxios.post(`/addaddress/${user_id}`, formData)
}

export function fetchGetUserAddress(user_id) {
  return myaxios.get(`/getaddress/${user_id}`)
}

export function fetchDeleteAddress(address_id) {
  return myaxios.post(`/deladdress/${address_id}`)
}

export function fetchUpdateAddress(address_id, addressInfo) {
  return myaxios.post(`/updateaddress/${address_id}`, addressInfo)
}