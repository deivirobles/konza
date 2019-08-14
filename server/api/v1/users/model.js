const mongoose = require("mongoose");

const { Schema } = mongoose;

const fields = {
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 128,
  },
  lastname: {
    type: String,
    default: "",
    required: true,
    trim: true,
    maxlength: 256,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    default: "",
    trim: true,
    maxlength: 256,
  },
  profilePhoto: {
    type: String,
    default: "",
    trim: true,
  },
};

const user = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model("user", user),
  fields,
};
