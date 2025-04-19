require("dotenv").config(".env");
const express = require('express')
const cron = require("node-cron");
const {checkAndPostUpdate} = require('../utils/checkAndUpdate');

const app = express();

const PORT = process.env.PORT || 3000;

const loader = () => {
  console.log("HI")
  //Set up Scheduler
  cron.schedule("* * * * *", () => {
    console.log("HIT CRON")
    checkAndPostUpdate();
  });

  app.get('/', (req, res) => {
  res.send('Bot is live!');
  });

  app.listen(PORT, ()=>{
    console.log(`SERVER RUNNING ON PORT: ${PORT}`);
  })
};

module.exports = loader