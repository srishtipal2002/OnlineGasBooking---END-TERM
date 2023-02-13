const mongoose = require("mongoose");

const ConnectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Please provide a name"],
    unique:true,
  },
});

module.exports=mongoose.model.Connection||mongoose.model("Connections",ConnectionSchema);