const fetch = require('node-fetch');

async function getToken() {
    const data = await fetch('https://rooftop-career-switch.herokuapp.com/token?email=imchiodo1@gmail.com');
    const jsonData = await data.json();
    return jsonData.token;
}

async function getBlocks(token) {
    const data = await fetch(`https://rooftop-career-switch.herokuapp.com/blocks?token=${token}`);
    const jsonData = await data.json();
    return jsonData.data;
}

async function checkAdjacent(string1, string2, token) {
    const url = `https://rooftop-career-switch.herokuapp.com/check?token=${token}`;
    const body = {method: "POST", body: JSON.stringify({   "blocks": [string1,string2]}), headers: {"Content-Type":"application/json"}};
    const data = await fetch(url, body);
    const jsonData = await data.json();
    return jsonData.message;
}

async function checkResult(orderedArray, token) {
    const url = `https://rooftop-career-switch.herokuapp.com/check?token=${token}`;
    const body = {method: "POST", body: JSON.stringify({   "encoded": orderedArray.join('')}), headers: {"Content-Type":"application/json"}};
    const data = await fetch(url, body);
    const jsonData = await data.json();
    return jsonData.message;
}

module.exports = {
    getToken,
    getBlocks,
    checkAdjacent,
    checkResult
}