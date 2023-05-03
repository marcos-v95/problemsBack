import { cartsDao } from "../services/carts.service.js";
import { productsDao } from "../services/products.service.js";

const viewProduct = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let data = await productsDao.getData(1, page)
  res.render('products', data)
}

const viewCart = async (req, res) => {
  let data = await cartsDao.getDataByID(req.params.cid)
  res.render('carts', data)
}

const viewHome = async (req, res) => {

  res.render('home', {})
}

const viewRegister = async (req, res) => {

  res.render('register', {})
}

const viewLogin = async (req, res) => {
  // let user = await req.session.user
  // res.render('login', {
  //   exists: (user) ? true : false,
  //   user
  // })
  let user = req.user
  console.log(req.body)
  if (user) { user = req.user.payload }

  res.render('login', {
    exists: (user) ? true : false,
    user
  })
}

const viewLogout = async (req, res) => {
  // req.session.destroy()
  res.cookie('loginToken', '', { maxAge: 1 })
  res.redirect('/')
}

export {
  viewProduct,
  viewCart,
  viewHome,
  viewRegister,
  viewLogin,
  viewLogout
}