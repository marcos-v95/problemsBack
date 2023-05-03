import MongoDBContainer from "../dao/mongoDB.dao.js"
import cartsModel from "../dao/models/carts.model.js"

export const cartsDao = new MongoDBContainer('carts', cartsModel)// exported only for views router

const getCartService = async (cid) => {
  let data = await cartsDao.getDataByID(cid)

  if (data) {
    return data.products.map((items) => items)
  } else {
    return []
  }
}

const createCartService = async (newCart) => {
  let response = await cartsDao.saveData(newCart)

  return response
}

const addProductinCartService = async (cid, pid) => {
  let cart = await cartsDao.getDataByID(cid)
  let exist = cart.products.findIndex((e) => e.product == pid)

  if (exist == -1) {
    cart.products.push({ product: pid, quantity: 1 })
    let result = await cartsDao.updateData(cid, cart)

    return result
  } else {
    cart.products[exist].quantity++
    let result = await cartsDao.updateData(cid, cart)

    return result
  }
}

const deleteProductinCartService = async (cid, pid) => {
  let cart = await cartsDao.getDataByID(cid)
  let prodtoDelete = cart.products.findIndex(e => e.id == pid)
  cart.products.splice(prodtoDelete, 1)

  let result = await cartsDao.updateData(cid, cart)
  return result
}

const cleanCartService = async (cid) => {
  let cart = await cartsDao.getDataByID(cid)
  cart.products = [];

  let result = await cartsDao.updateData(cid, cart)
  return result
}

const updateCartService = async (cid, body) => {
  let cart = await cartsDao.getDataByID(cid)
  cart.products = body

  let result = await cartsDao.updateData(cid, cart)
  return result
}

const updateProductinCartService = async (cid, pid, body) => {
  let cart = await cartsDao.getDataByID(cid)
  let pIndex = cart.products.findIndex(x => x.product._id == pid)

  cart.products[pIndex].quantity = parseInt(body.quantity)

  let result = await cartsDao.updateData(cid, cart)
  return result
}

export {
  getCartService,
  createCartService,
  addProductinCartService,
  deleteProductinCartService,
  cleanCartService,
  updateCartService,
  updateProductinCartService
}