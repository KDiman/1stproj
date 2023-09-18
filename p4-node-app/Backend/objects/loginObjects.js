const LogInModel = require("../models/login.entity");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

class LogIn {
  constructor() {}

  async createAccount({ Username, Password }) {
    try {
      const existingUser = await LogInModel.findOne({ Username });
      if (existingUser) {
        throw new Error('Username is already taken');
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(Password, salt);

      const newUser = new LogInModel({ Username, Password: hash });
      const savedUser = await newUser.save();

      return {
        _id: savedUser._id,
        Username: savedUser.Username,
      };
    } catch (error) {
      console.error("Error creating login account:", error.message);
      throw error;
    }
  }

  async findUsername(Username) { 
    try {
      const username = await LogInModel.findOne({ Username }); 
      if (!username) {
        throw new Error("User not found");
      }

      return username;
    } catch (error) {
      console.error("Error finding user by Username:", error);
      throw error;
    }
  }
}

module.exports = LogIn;
