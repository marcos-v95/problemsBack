import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'
import passport from 'passport';

// Dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default __dirname

// Bcrypt 
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

// Passport Error Handling

export const errorHandling = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) {

        return next(err)
      }
      if (!user) return res.status(401).send({ error: info.message ? info.message : info.toString() })

      req.user = user;
      next()

    }(req, res, next))
  }
}