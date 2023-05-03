import MongoDBContainer from "../dao/mongoDB.dao.js";
import productsSchema from "../dao/models/products.model.js";

export const productsDao = new MongoDBContainer('products', productsSchema)// exported only for views router

const getProductsService = async (limit, page, sort, category, status) => {
  let options = {
    limit: limit || 10,
    page: page || 1,
    sort: { price: sort },
    lean: true // lean prevents the "document hydration", sends to handlebars the document as a plain object
  }
  let query = (category || status) ? { $or: [{ category: category }, { status: status }] } : {}

  let products = await productsDao.getData(query, options)
  products.prevLink = products.hasPrevPage ? `http://localhost:8080/products?page=${products.prevPage}` : '';//link for views router
  products.nextLink = products.hasNextPage ? `http://localhost:8080/products?page=${products.nextPage}` : '';//link for views router
  products.isValid = !(page <= 0 || page > products.totalPages) //validate for views router

  return {
    status: 'success',
    payload: products.docs,
    totalPages: products.totalPages,
    currentPage: products.page,
    prevPage: products.prevPage,
    nextPage: products.nextPage,
    hasPrevPage: products.hasPrevPage,
    hasNextPage: products.hasNextPage,
    prevLink: products.prevLink,
    nextLink: products.nextLink,
    isValid: products.isValid //only for views router
  }
}

const getProductbyIDService = async (pid) => {
  let product = await productsDao.getDataByID(pid)
  return product
}

const createProductService = async (newProduct) => {
  let data = await productsDao.getData()
  const { title, description, code, price, stock, category } = newProduct
  let pCode = data.payload.find(p => p.code == code)

  if (pCode) { return console.log('Error: Product with repeated code') }

  if (title && description && code && price && stock && category) {
    let response = await productsDao.saveData(newProduct)
    return response
  } else {
    return console.log('Error: Missing enter fields')
  }
}

const updateProductService = async (pid, newProduct) => {
  let response = await productsDao.updateData(pid, newProduct)
  return response
}

const deleteProductService = async (pid) => {
  let response = await productsDao.deleteData(pid)
  return response
}

export {
  getProductsService,
  getProductbyIDService,
  createProductService,
  updateProductService,
  deleteProductService
}