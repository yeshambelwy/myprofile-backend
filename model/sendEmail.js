const mongoose = require("mongoose");


//create schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "First Name is required"],
    }, 
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    joboffers: {
      type: String,
      required: [true, "Select one Job Type"],
    },

    message: {
      type: String,
      required:[true, "Message is required"],
    },
})
//Compile the user model
const SendEmail = mongoose.model("SendEmail", userSchema);

module.exports = SendEmail;
