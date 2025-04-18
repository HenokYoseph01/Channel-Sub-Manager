const {getSubCount} = require('./subCounter')
const {readStreak,writeStreak} = require('./streakManager')
const {TELEGRAM_API} = require('../utils/constants');
const axios = require('axios');

async function checkAndPostUpdate(){
    console.log('HI')

    const newCount = await getSubCount();

    if(newCount == null) return res.send("Failed to fetch count :(");

    const streakData = readStreak();
    let message = ''; //What will be sent to the channel

    if(newCount === streakData.currentCount){
        streakData.streakDays += 1;
        message = `${newCount} subs streak continues for ${streakData.streakDays} day${streakData.streakDays > 1 ? "s" : ""}.`;
    }
    else{
        //if statement here to see if subs went up (yay) or subs went down (nay)
        message = `${streakData.currentCount} subs streak broken. ${newCount} subs streak started for 0 days.`;
        streakData.currentCount = newCount
        streakData.streakDays = 0
    }

    writeStreak(streakData)

   await axios.post(`${TELEGRAM_API}/sendMessage`,{
        chat_id:process.env.CHANNEL_NAME,
        text:message
   })

   console.log('Message Sent: ', message);
}

module.exports = {checkAndPostUpdate}