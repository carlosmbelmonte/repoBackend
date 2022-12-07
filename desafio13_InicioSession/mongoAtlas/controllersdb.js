const mongoose = require('mongoose');

var baseDeDatosConectada = false;

function conectarDB(url, cb) {
  mongoose.connect(url, {
    serverSelectionTimeoutMS: 3000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
    auth: {
      username: 'carlosmbelmonte',
      password: 'Carlos123'
    }
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
