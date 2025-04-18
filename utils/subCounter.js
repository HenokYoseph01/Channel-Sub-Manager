const axios = require('axios');
const {TELEGRAM_API} = require('../utils/constants');

const getSubCount = async () => {
    try {
        const res = await axios.get(`${TELEGRAM_API}/getChatMemberCount`,{
            params:{
                chat_id:process.env.CHANNEL_NAME
            }
        });
        return res.data.result;

    } catch (error) {
        console.error("Error getting subscriber count:", error.response?.data || error.message);
        return null;
    }
}

module.exports = {getSubCount};