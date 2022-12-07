const express = require('express')
const exphbs = require('express-handlebars')
const { Server: HTTPServer} = require('http')
const { Server: IOServer } = require("socket.io")
const session = require('express-session')
const { normalize, schema } = require("normalizr")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt')
const parseArgs = require('minimist')
const dotenv = require('dotenv').config()

const rutas = require('./funcionesRutas');
//const config = require('./mongoAtlas/config');
const controllersdb = require('./mongoAtlas/controllersdb');
const User = require('./mongoAtlas/models');

const { Contenedor } = require('./public/js/contenedor') 
const chats = new Contenedor('./public/chat.txt')

const { routerFaker , productosRandom} = require('./routes/routeFaker')
const { router } = require('./routes/routes')
let productos = productosRandom()

const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'id' }) 
const messageSchema = new schema.Entity('messages', { author: authorSchema }, { idAttribute: '_id' }) 

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
    }

    let userWithId
    try {
      userWithId = await User.create(newUser)
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
  const salt = await bCrypt.genSalt(10);
  return await bCrypt.hash(password, salt);
}

async function isValidPassword(user, password) {
  console.log(`Comparando ${password} con ${user.password}`);
  return await bCrypt.compare(password, user.password);
}

// ------------------------------------------------------------------------------
//  EXPRESS
// ------------------------------------------------------------------------------

const app = express();
const http = new HTTPServer(app)//****************************************************************//
const io = new IOServer(http)//****************************************************************//
app.use('/api/productos-test', routerFaker)
app.use('/api/randoms', router)
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

const options = {
  alias: { p: 'puerto' },
  default: { puerto: process.env.PUERTO }
}

const { puerto, _ } = parseArgs(process.argv.slice(2), options)
const port = puerto

//app.use(express.static(__dirname + '/views'));
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'shhhhhhhh',
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: parseInt(process.env.TIEMPOEXPIRACION)
  },
  rolling: true,
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  next()
});

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
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), rutas.postSignup);
app.all('/failsignup', rutas.getFailsignup);

//  LOGOUT
app.get('/logout', rutas.getLogout);



// PRIVATE
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}
app.get('/info', checkAuthentication, rutas.getInfo)

//  FAIL ROUTE
app.all('*', rutas.failRoute);
// ------------------------------------------------------------------------------
//  LISTEN SERVER
// ------------------------------------------------------------------------------
controllersdb.conectarDB(process.env.URLBASE,JSON.parse(process.env.MI_USER),err => {

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
  let allChats = await chats.getAll()
  const normalizedMessages = normalize(allChats, [messageSchema])//---->Para Normalizr
  socket.emit('allMensajes', normalizedMessages)

  socket.on('newProducto', async data => {
      await postProducto(data)
      io.sockets.emit('allProductos', productos)
  })

  socket.on('newMensaje', async msg => {
      await chats.saveNormalizr(msg)
      let newAllChats = await chats.getAll()
      const newNormalizedMessages = normalize(newAllChats, [messageSchema])//---->Para Normalizr
      io.sockets.emit('allMensajes', newNormalizedMessages)
  })
})