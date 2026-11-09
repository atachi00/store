import api from './_axios.js'

// общий каталог
export const getProducts = async () => {
  const { data } = await api.get('/products')
  return data
}

// товары текущего продавца
export const getMyProducts = async () => {
  const { data } = await api.get('/my-products')
  return data
}

export const getProductsById = async (id) => {
  const { data } = await api.get(`/products/${id}`)
  return data
}

export const deleteProduct = async (id) => {
  return await api.delete(`/products/${id}`)
}
