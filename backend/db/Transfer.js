const mongoose = require("mongoose");

const TransferSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Please provide a name"],
  },
  naddress: {
    type: String,
    required: [true, "Please provide a name"],
    unique:true,
  },
});

module.exports=mongoose.model.Transfer||mongoose.model("Transfers",TransferSchema);