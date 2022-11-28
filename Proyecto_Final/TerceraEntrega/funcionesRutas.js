import path from 'path';//---> Solucion encontrada en Google
import {fileURLToPath} from 'url';//---> Solucion encontrada en Google
const __filename = fileURLToPath(import.meta.url);//---> Solucion encontrada en Google
const __dirname = path.dirname(__filename);//---> Solucion encontrada en Google

function getRoot(req, res) {
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  LOGIN
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getLogin(req, res) {
  if (req.isAuthenticated()) {

    let user = req.user;
    res.render('formulario', {
      userSend: user.username,
      avatarSend: user.avatar,
      mailSend: user.email,
      ageSend: user.age,
      addresSend: user.address,
      phoneSend: user.phone,
    });
  }
  else {
    console.log('user NO logueado');
    res.sendFile(__dirname + '/views/login.html');
  }
}

function getSignup(req, res) {
  if (req.isAuthenticated()) {

    let user = req.user;
    res.render('formulario', {
      userSend: user.username,
      avatarSend: user.avatar,
      mailSend: user.email,
      ageSend: user.age,
      addresSend: user.address,
      phoneSend: user.phone,
    });
  }
  else {
    console.log('user NO logueado');
    res.sendFile(__dirname + '/views/signup.html');
  }
    
}


function postLogin (req, res) {
  let user = req.user;
  console.log("consulta por usuario: ", user)
  res.redirect('/login') 
}

function postSignup (req, res) {
  let user = req.user;
  res.redirect('/login')
}

function getFaillogin (req, res) {
  res.render('login-error', {
  });
}

function getFailsignup (req, res) {
  res.render('signup-error', {
  });
}

function getLogout (req, res) {
  if (req.isAuthenticated()) {

    let user = req.user;
    
    req.logout(function(err) {
      if (err) { return next(err); }
        res.render('logout', {
          userSend: user.username
        })
    })
  }
  else {
    console.log('user NO logueado');
    res.sendFile(__dirname + '/views/login.html');
  }
}

function failRoute(req, res){
  res.status(404).render('routing-error', {});
}

export default{
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailsignup
}