const log4js = require('log4js')
const logger = require('../controlador/logger');
const path = require('path')

function getRoot(req, res) {
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  LOGIN
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getLogin(req, res) {
  if (req.isAuthenticated()) {

    var user = req.user;
    res.render('formulario', {
      userSend: user.username
    });
  }
  else {
    logger.info('user NO logueado');
    res.sendFile(path.join(__dirname, '../views/login.html'));
  }
}

function getSignup(req, res) {
  if (req.isAuthenticated()) {

    var user = req.user;
    res.render('formulario', {
      userSend: user.username
    });
  }
  else {
    logger.info('user NO logueado');
    res.sendFile(path.join(__dirname, '../views/signup.html'));
  }
    
}


function postLogin (req, res) {
  var user = req.user;
  logger.info("consulta por usuario: ", user)
  res.redirect('/login') 
}

function postSignup (req, res) {
  var user = req.user;
  res.redirect('/login')
}

function getFaillogin (req, res) {
  res.render('login-error', {});
  logger.warn(`Login-Error`)
}

function getFailsignup (req, res) {
  res.render('signup-error', {});
  logger.warn(`Signup-Error`)
}

function getLogout (req, res) {
  if (req.isAuthenticated()) {

    var user = req.user;
    res.render('logout', {
      userSend: user.username
    });
    req.logout()
  }
  else {
    logger.info('user NO logueado');
    res.sendFile(path.join(__dirname, '../views/login.html'));
  }
}

function getInfo(req, res){
  let objNew = { 
    argumentoEntrada: process.argv0,
    sistemaOperativo: process.platform,
    nodeVersion: process.version,
    memoriaTotal: process.memoryUsage.rss(),
    pathEjecucion: process.execPath,
    processId: process.pid,
    carpetaProyecto: process.cwd(),
    numCPUs: require('os').cpus().length
  }
  console.log(objNew)
  res.render('info', objNew);
}

function failRoute(req, res){
  res.status(404).render('routing-error', {});
  logger.warn(`Routing-Error`)
}

module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getInfo,
    getFailsignup
}
