const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.models = {};
module.exports =
  mongoose.models.admins || mongoose.model("admins", adminSchema);
