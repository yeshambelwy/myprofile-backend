const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const sendGridTransporter = require("nodemailer-sendgrid-transport");
const SendEmail = require("./model/sendEmail");
const appErr = require("./util/appError");
require("dotenv").config();
require("./config/dbconnect");

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json()); 

const PORT = process.env.port || 3001;

const transporter = nodemailer.createTransport(
  sendGridTransporter({
    auth: {
      api_key: process.env.API_KEY
    },
  })
);
app.post("/contactme", async (req, res, next) => {
  const { name, email, joboffers, message } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Please add your name or Company name" });
  }

  if (!email) {
    return res.status(400).json({ error: "Please add your email so that we can communicate" });
  }

  if (!joboffers) {
    return res.status(400).json({ error: "Please add job offers" });
  }
  if (!message) {
    return res.status(400).json({ error: "Please add your message" });
  }

  try {
    //Create Message save into the database
    const createMessage = await SendEmail.create({
      name,
      email,
      joboffers,
      message,
    });
    
    transporter.sendMail({
      to: "yeshambelwy@gmail.com",
      from: "yeshambelwy@gmail.com",
      subject: "Job Offers",
      html: `
          
          <h5>Details Informtion:</h5>
  
          <ul>
          <li> <p>Name: ${name}</p> </li>
          <li> <p>E-mail: ${email}</p> </li>
          <li> <p>Job Types: ${joboffers}</p> </li>
          <li> <p>Message: ${message}</p> </li>
  
  
          </ul>
  
          `,
    });

    res.json({ success: "Your e-mail has been sent" });
  } catch (error) {
    next(appErr(error.message));
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});

