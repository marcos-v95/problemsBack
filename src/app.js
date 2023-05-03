import express from "express";
import handlebars from 'express-handlebars'
import __dirname from './utils.js';

// Session
// import session from "express-session";
// import MongoStore from "connect-mongo";

// Passport
import passport from "passport";
import initializePassport from "./config/passport.config.js";

// Cookies
import cookieParser from "cookie-parser";

// Routes
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import usersRouter from './routes/users.router.js'
import viewsRouter from './routes/views.router.js'

// Server
const app = express()
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => { console.log(`Server running on PORT: ${server.address().port}`) })
server.on('error', (error) => console.log(error))

// Express config
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// // Session config
// app.use(session({
//   store: MongoStore.create({  // database storage
//     mongoUrl: 'mongodb+srv://marcos95:ecommerce1234@ecommerce.llqcwcl.mongodb.net/?retryWrites=true&w=majority',
//     mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
//     ttl: 150
//   }),
//   secret: "SecretforMySession",
//   resave: false,
//   saveUninitialized: false
// }))

// Passport config
initializePassport()
app.use(passport.initialize())
// app.use(passport.session())

// Cookies
app.use(cookieParser('secretKey'))

// Routes 
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', usersRouter)
app.use('/', viewsRouter)

// Handlebars Engine config
app.engine('handlebars', handlebars.engine({
  runtimeOptions: { // resolves an error from handlebars
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');