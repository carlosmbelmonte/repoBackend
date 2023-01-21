const mongoose = require('mongoose');

var baseDeDatosConectada = false;

function conectarDB(url, objVar, cb) {
  mongoose.connect(url, {
    serverSelectionTimeoutMS: 3000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
    auth: {...objVar}
  }, err => {
    if (!err) {
      baseDeDatosConectada = true;
    }
    if (cb != null) {
      cb(err);
    }
  });
}

module.exports = {
  conectarDB
}
