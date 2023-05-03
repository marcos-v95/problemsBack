import { Router } from "express";
// Controllers
import {
    getProducts,
    getProductbyID,
    createProduct,
    updateProduct,
    deleteProduct 
} from "../controllers/products.controller.js";

const router= Router();

router.get('/', getProducts)

router.get('/:pid', getProductbyID)

router.post('/', createProduct)

router.put('/:pid', updateProduct)

router.delete('/:pid', deleteProduct)


export default router