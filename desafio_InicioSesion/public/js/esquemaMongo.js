const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    alias: {type: String, required: true, max: 255, unique: true, dropDups: true},
    email: {type: String, required: true, max: 255, unique: true, dropDups: true},
    password: {type: String, required: true }
})

let Users = mongoose.model("usuarios", UserSchema);

module.exports = { Users }