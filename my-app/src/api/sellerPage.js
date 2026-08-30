import api from './_axios.js'

export const  getProducts = async () => {
    const {data} = await api.get('/products')
    return data
}

export const  getProductsById = async (id) => {
    const {data} = await api.get(`/products/${id}`)
    return data
}

export const deleteProducts = async (parametricUrl) => {
    if (!parametricUrl) return 

    return await api.delete(parametricUrl)
}