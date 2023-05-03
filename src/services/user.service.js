import MongoDBContainer from "../dao/mongoDB.dao.js";
import usersSchema from "../dao/models/users.model.js";


export const usersDao = new MongoDBContainer('users', usersSchema) // exported for passport config

const userRegisterService = async (user) => {

  return { status: 'success', payload: user }
}

const userLoginService = async (user) => {

  return { status: 'success', payload: user }
}


export {
  userRegisterService,
  userLoginService
}