require("dotenv").config(".env");
const cron = require("node-cron");
const {checkAndPostUpdate} = require('../utils/checkAndUpdate');

const loader = () => {
  //Set up Scheduler
  cron.schedule("0 23 * * *", () => {
    checkAndPostUpdate();
  });
};

module.exports = loader