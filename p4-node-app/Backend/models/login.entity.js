const mongoose = require("mongoose");


const logInSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  
});



const LogInModel = mongoose.model("LogIn",logInSchema)

module.exports = LogInModel