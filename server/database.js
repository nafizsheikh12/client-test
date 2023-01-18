const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const dotenv = require('dotenv');
dotenv.config();
const db = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });

  }

  module.exports = db;