//var mongoose = require('mongoose');
import mongoose from 'mongoose'
 
export default mongoose.model('Users',{
    username: String,
    password: String,
    email: String,
    address: String,
    age: Number,
    phone: Number,
    avatar: String
});
