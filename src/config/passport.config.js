import passport from "passport";
import local from "passport-local"
import githubStrategy from "passport-github2"
import jwt from 'passport-jwt'

import { usersDao } from "../services/user.service.js";
import { createHash, isValidPassword } from "../utils.js";

const localStategy = local.Strategy;

const initializePassport = () => {
  passport.use('register', new localStategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
    try {
      const { first_name, last_name, age } = req.body;
      if (!first_name || !last_name || !email || !age || !password) return done(null, false, { status: 'error', message: 'All fields are required' })

      let user = { first_name, last_name, email, age, password: createHash(password) }
      if (email == 'adminCoder@coder.com' && password == 'adminCoder123') user.role = 'admin'

      let exist = await usersDao.model.findOne({ email: email })
      if (exist) return done(null, false, { status: 'error', message: 'The user is already registered' })

      let result = await usersDao.saveData(user)
      return done(null, result)

    } catch (error) {
      done(error)
    }
  }))

  passport.use('login', new localStategy({ usernameField: 'email' }, async (email, password, done) => {
    let user = await usersDao.model.findOne({ email: email })

    try {
      if (!email || !password) return done(null, false, { status: 'error', message: 'All fields are required' })
      if (!user) return done(null, false, { status: 'error', message: 'User not found, please register' })
      if (!isValidPassword(user, password)) return done(null, false, { message: 'Incorrect password' })

      return done(null, user)

    } catch (error) {
      return done(error)
    }

  }))

  passport.use('github', new githubStrategy({
    clientID: 'Iv1.229ce50a0c5f4bad',
    clientSecret: '5efe0dcc7b2d4ea445c7561707046484380c5bf2',
    callbackURL: 'http://localhost:8080/api/sessions/githubcallback'

  }, async (accessToken, refreshToken, profile, done) => {
    let user = await usersDao.model.findOne({ email: profile._json.email })

    try {
      if (!user) { // user doesnt exist in database
        let newUser = {
          first_name: profile._json.name,
          last_name: ' ',
          age: profile._json.age || 1,
          email: profile._json.email,
          password: ' '
        }

        let result = await usersDao.saveData(newUser)
        return done(null, result)

      } else { // user exists in database
        return done(null, user)
      }
    } catch (error) {
      return done(error)
    }
  }))
  // Strategy used to extract the token from a cookie with jwt
  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) { token = req.cookies['loginToken'] }

    return token
  }
  passport.use('jwt', new jwt.Strategy({
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: 'loginKey'
  }, async (jwt_payload, done) => {
    try {
      return done(null, jwt_payload)
    } catch (error) {
      return done(error)
    }
  }))

  // Serializer and Deserializer
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    let result = await usersDao.model.findOne({ _id: id })
    return done(null, result)
  })
}

export default initializePassport