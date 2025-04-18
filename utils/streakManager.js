const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "../streak.json")

function readStreak() {
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data);
}

function writeStreak(data){
    fs.writeFileSync(filePath,JSON.stringify(data,null,2))
}

module.exports = {readStreak,writeStreak}