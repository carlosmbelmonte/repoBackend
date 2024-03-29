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
    console.log('user NO logueado');
    res.sendFile(__dirname + '/views/login.html');
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
    console.log('user NO logueado');
    res.sendFile(__dirname + '/views/signup.html');
  }
    
}


function postLogin (req, res) {
  var user = req.user;
  console.log("consulta por usuario: ", user)
  res.redirect('/login') 
}

function postSignup (req, res) {
  var user = req.user;
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

    var user = req.user;
    res.render('logout', {
      userSend: user.username
    });
    req.logout()
  }
  else {
    console.log('user NO logueado');
    res.sendFile(__dirname + '/views/login.html');
  }
}

function getInfo(req, res){
  res.render('info', { 
      argumentoEntrada: process.argv0,
      sistemaOperativo: process.platform,
      nodeVersion: process.version,
      memoriaTotal: process.memoryUsage.rss(),
      pathEjecucion: process.execPath,
      processId: process.pid,
      carpetaProyecto: process.cwd()
  });
}

function failRoute(req, res){
  res.status(404).render('routing-error', {});
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
