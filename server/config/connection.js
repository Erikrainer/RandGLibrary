const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

module.exports = mongoose.connection;
