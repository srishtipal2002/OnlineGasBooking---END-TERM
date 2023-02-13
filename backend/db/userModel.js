const mongoose = require("mongoose");

// user schema
const UserSchema = new mongoose.Schema({
  // name field
  name: {
    type:String,
    required:[true,"Please provide a name"],
    unique:false
  },
  // email field
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  //   password field
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },

  // Address Field
  address: {
    type:String,
    required:[true,"Please provide a name"],
    unique:true
  },

  // Connections
  connection:{
    type:Number,
    default:0
  },
  //admin
  employee:{
    type:Number,
    default:0
  }
});

// export UserSchema
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
