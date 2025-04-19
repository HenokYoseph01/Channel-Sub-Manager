require("dotenv").config(".env");
const express = require('express')
const cron = require("node-cron");
const {checkAndPostUpdate} = require('../utils/checkAndUpdate');

const app = express();

const PORT = process.env.PORT || 3000;

const loader = () => {
  //Set up Scheduler
  cron.schedule("1-5 * * * *", () => {
    checkAndPostUpdate();
  });

  app.listen(PORT, ()=>{
    console.log(`SERVER RUNNING ON PORT: ${PORT}`);
  })
};

module.exports = loader