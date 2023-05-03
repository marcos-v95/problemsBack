import { Router } from "express";
// Controllers
import {
  getCart,
  createCart,
  addProductinCart,
  deleteProductinCart,
  cleanCart,
  updateCart,
  updateProductinCart
} from '../controllers/carts.controller.js'

const router= Router()

router.get('/:cid', getCart)

router.post('/', createCart)

router.post('/:cid/products/:pid', addProductinCart)

router.delete('/:cid/products/:pid', deleteProductinCart)

router.delete('/:cid', cleanCart)

router.put('/:cid', updateCart)

router.put('/:cid/products/:pid', updateProductinCart)

export default router