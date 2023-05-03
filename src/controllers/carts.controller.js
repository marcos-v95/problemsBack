// Services
import {
  getCartService,
  createCartService,
  addProductinCartService,
  deleteProductinCartService,
  cleanCartService,
  updateCartService,
  updateProductinCartService
} from "../services/carts.service.js"

// Controllers

const getCart = async (req, res) => {
  let cart = await getCartService(req.params.cid)
  res.send(cart)
}

const createCart = async (req, res) => {
  let cart = { products: [] }
  let result = await createCartService(cart)
  res.send(result)
}

const addProductinCart = async (req, res) => {
  let result = await addProductinCartService(req.params.cid, req.params.pid)
  res.send(result)
}

const deleteProductinCart = async (req, res) => {
  let result = await deleteProductinCartService(req.params.cid, req.params.pid)
  res.send(result)
}

const cleanCart = async (req, res) => {
  let result = await cleanCartService(req.params.cid)
  res.send(result)
}

const updateCart = async (req, res) => {
  let result = await updateCartService(req.params.cid, req.body)
  res.send(result)
}

const updateProductinCart = async (req, res) => {
  let result = await updateProductinCartService(req.params.cid, req.params.pid, req.body)
  res.send(result)
}

export {
  getCart,
  createCart,
  addProductinCart,
  deleteProductinCart,
  cleanCart,
  updateCart,
  updateProductinCart
}