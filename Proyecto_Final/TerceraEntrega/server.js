import express from 'express'
import { Server as HTTPServer} from 'http'
import routerProductos from './routes/routeProductos.js'
import routerCarrito from './routes/routeCarrito.js'

import bcrypt from 'bcrypt'
import { engine } from 'express-handlebars';
import session from "express-session";
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import {Server as IOServer} from 'socket.io';
import nodemailer from 'nodemailer'

import rutas from './funcionesRutas.js'
import config from './mongoAtlas/config.js'
import controllersdb from './mongoAtlas/controllersdb.js'
import User from './mongoAtlas/models.js'
import { productosDao as productosApi } from './daos/index.js'
import smsSend from './public/js/twiliosms.js'
import wspSend from './public/js/twiliowsp.js'

let productos = await productosApi.getAll()

function createSendMail(mailConfig) {

  const transporter = nodemailer.createTransport(mailConfig);

  return function sendMail({ to, subject, text, html }) {
    const mailOptions = { from: mailConfig.auth.user, to, subject, text, html };
    return transporter.sendMail(mailOptions)
  }
}

function createSendMailEthereal() {
  return createSendMail({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'carlos.m.belmonte@gmail.com',
        pass: 'jnvgvypbhrdyzapl'
    },
    tls: {
        rejectUnauthorized: false
    }
  })
}

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
    async (req, username, password, done) => {
      let user
      try {
        user = await User.findOne({ 'username': username })
      } catch (error) {
        return done(err);
      }
  
      if (user) {
        return done(null, false)
      }
  
      const newUser = {
        username: username,
        password: await createHash(password),
        email: req.body.email,
        age: req.body.age,
        address: req.body.address,
        phone: req.body.phone,
        avatar: req.body.avatar||req.body.myFile,
      }
      const sendMail = createSendMailEthereal()
      const cuentaDePrueba = 'carlos.m.belmonte@gmail.com'
      const asunto = 'Nuevo Registro'
      let mensajeHtml = `
        <div>
          <h5>Informacion de Usuario</h5>
          <ul>
            <li>Nombre y Apellido: ${newUser.username}</li>
            <li>Edad: ${newUser.age}</li>
            <li>Email: ${newUser.email}</li>
            <li>Direccion: ${newUser.address}</li>
            <li>Telefono: ${newUser.phone}</li>
            <li>Avatar (URL): ${newUser.avatar}</li>        
          </ul>
        </div>`

      let userWithId
      let infoRegistro
      try {
        userWithId = await User.create(newUser)
        infoRegistro = await sendMail({
          to: cuentaDePrueba,
          subject: asunto,
          html: mensajeHtml
        })
      } catch (error) {
        return done(err);
      }
  
      return done(null, userWithId)
  })
)
  
passport.use('login', new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
    let user
    try {
        user = await User.findOne({ email })
        console.log("usuario encontrado: ", user)
    } catch (error) {
        return done(err);
    }

    if (!user) {
        return done(null, false);
    }

    if (!await isValidPassword(user, password)) {
        return done(null, false);
    }

    return done(null, user);
    })
);
  
passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, done);
});
  
async function createHash(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
  
async function isValidPassword(user, password) {
    console.log(`Comparando ${password} con ${user.password}`);
    return await bcrypt.compare(password, user.password);
}

const app = express()
const http = new HTTPServer(app)
const io = new IOServer(http)

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

app.use(session({
  secret: 'shhhhhhhh',
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: config.TIEMPO_EXPIRACION
  },
  rolling: true,
  resave: true,
  saveUninitialized: false
}));
  
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  next()
})
const port = process.env.PORT || 8080;
// ------------------------------------------------------------------------------
//  ROUTING GET POST
// ------------------------------------------------------------------------------
//  INDEX
app.get('/', (req, res) => {
    res.redirect('/login')  
})
  
//  LOGIN
app.get('/login', rutas.getLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), rutas.postLogin);
app.all('/faillogin', rutas.getFaillogin);
  
//  SIGNUP
app.get('/signup', rutas.getSignup);
app.post('/signup',passport.authenticate('signup', { failureRedirect: '/failsignup' }), rutas.postSignup);
app.all('/failsignup', rutas.getFailsignup);

//  LOGOUT
app.get('/logout', rutas.getLogout);

//  FAIL ROUTE
app.all('*', rutas.failRoute);

// PRIVATE
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}
  
app.get('/ruta-protegida', checkAuthentication, (req, res) => {
  const { user } = req;
  console.log(user);
  res.send('<h1>Ruta OK!</h1>');
});
  
// ------------------------------------------------------------------------------
//  LISTEN SERVER
// ------------------------------------------------------------------------------
controllersdb.conectarDB(config.URL_BASE_DE_DATOS, err => {

  if (err) return console.log('error en conexión de base de datos', err);
  console.log('BASE DE DATOS CONECTADA');

  http.listen(port, (err) => {
    if (err) return console.log('error en listen server', err);
    console.log(`Server running on port ${port}`);
  });
  
});


io.on("connection", async(socket) => {
  console.log("Nuevo cliente conectado")
  socket.emit('allProductos', productos)

  socket.on('newProducto', async data => {
      io.sockets.emit('allProductos', productos)
  })

  socket.on('mailCarrito', async(objMailCarrito) => {
     
      //wspSend.wspTwilio()
      const sendMailCarrito = createSendMailEthereal()
      const cuentaDePrueba = 'carlos.m.belmonte@gmail.com'
      const asunto = `Nuevo pedido de ${objMailCarrito.nombre} - ${objMailCarrito.mail}`
      let mensajeHtml = `
        <div>
          <h5>Informacion del pedido</h5>
          <ul>
            <li>ID Carrito: ${objMailCarrito.idCarrito}</li>
            <li>Cantidad de productos: ${objMailCarrito.cantProd}</li>      
          </ul>
        </div>
        `

      for(let i=0;i<objMailCarrito.cantProd;i++){
        mensajeHtml +=
        ` <h5>Producto ${i+1}</h5>
          <ul>
            <li>Producto: ${objMailCarrito.productos[i].producto}</li>
            <li>Descripcion: ${objMailCarrito.productos[i].descripcion}</li>
            <li>Precio: ${objMailCarrito.productos[i].precio}</li>
          </ul>
        `          
      }

      await sendMailCarrito({
        to: cuentaDePrueba,
        subject: asunto,
        html: mensajeHtml
      }) 
  })
})