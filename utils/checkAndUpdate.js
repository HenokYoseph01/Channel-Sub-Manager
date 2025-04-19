const {getSubCount} = require('./subCounter')
const {readStreak,writeStreak} = require('./streakManager')
const {TELEGRAM_API} = require('../utils/constants');
const axios = require('axios');

async function checkAndPostUpdate(){

    const newCount = await getSubCount();

    if(newCount == null) return res.send("Failed to fetch count :(");



    const streakData = readStreak();
    let message = ''; //What will be sent to the channel

    //First time user check (since sub and streak are set to 0)
    if (streakData.currentCount === 0){
        streakData.currentCount = newCount
        streakData.streakDays = 0;

        writeStreak(streakData)
    }

    if(newCount === streakData.currentCount){
        streakData.streakDays += 1;
        message = `CHANNEL MANAGER BOT HERE🫡: ${newCount} subs streak 🔥 continues for ${streakData.streakDays} day${streakData.streakDays > 1 ? "s" : ""}💪.`;
    }
    else{
        //if statement here to see if subs went up (yay) or subs went down (nay)
        const subEmoji = newCount > streakData.currentCount? '🗿':'💀' 
        const streakEmoji = newCount > streakData.currentCount? '😎':'😔' 

        message = `CHANNEL MANAGER BOT HERE🫡: ${streakData.currentCount} subs streak broken ${subEmoji}. ${newCount} subs streak started for 0 days ${streakEmoji}.`;
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