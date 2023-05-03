import { Router } from "express";
import passport from "passport";
import { errorHandling } from "../utils.js";
// Controllers
import {
  userRegister,
  userLogin,
  userLoginGithub,
  githubCallback,
  userCurrent
} from "../controllers/users.controller.js"

const router = Router();


router.post('/register', passport.authenticate('register', { session: false }), userRegister)

router.post('/login', errorHandling('passport', { session: false }), userLogin)

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), userLoginGithub)

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/' }), githubCallback)

router.get('/current', errorHandling('jwt', { session: false }), userCurrent)

export default router 