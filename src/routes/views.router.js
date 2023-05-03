import { Router } from "express";
import passport from "passport";
// View Controllers
import {
  viewProduct,
  viewCart,
  viewHome,
  viewLogin,
  viewLogout,
  viewRegister
} from "../controllers/views.controller.js";


const router = Router();

router.get('/products', viewProduct)

router.get('/carts/:cid', viewCart)

router.get('/', viewHome)

router.get('/register', viewRegister)

router.get('/login', passport.authenticate('jwt', { session: false }), viewLogin)

router.get('/logout', viewLogout)

export default router