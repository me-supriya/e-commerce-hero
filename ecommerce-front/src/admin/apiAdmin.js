import { API } from '../config'

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}

export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET'
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

// Coupon Api's
export const createCoupon = (token, coupon) => {
  console.log(JSON.stringify(coupon))
  return fetch(`${API}/coupon/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(coupon)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}

export const getCoupon = ({ code }) => {
  return fetch(`${API}/coupon/${code}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const getUserBalance = ({ userId }) => {
  return fetch(`${API}/wallet/balance/${userId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const addUserWallet = payload => {
  return fetch(`${API}/wallet/add/${payload.userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.token}`
    },
    body: JSON.stringify(payload.wallet)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}

export const deductUserWallet = payload => {
  return fetch(`${API}/wallet/deduct/${payload.userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.token}`
    },
    body: JSON.stringify(payload.wallet)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err))
}
