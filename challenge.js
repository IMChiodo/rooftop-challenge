import fetch from 'node-fetch';

async function check(blocks, token)
{
    let orderedBlocks = [], j = 0, i = 0;
    orderedBlocks.push(blocks[0]);
    blocks.splice(0,1);
    while (i < blocks.length) {
        if (await checkAdjacent(orderedBlocks[j], blocks[i], token)) {
            orderedBlocks.push(blocks[i]);
            blocks.splice(i,1);
            j++;
            i = 0;
        } else {
            i++;
        }
    }

  return orderedBlocks;
}

async function getToken() {
   const data = await fetch('https://rooftop-career-switch.herokuapp.com/token?email=imchiodo1@gmail.com');
   return (await data.json()).token;
}

async function getBlocks(token) {
   const data = await fetch(`https://rooftop-career-switch.herokuapp.com/blocks?token=${token}`);
   return (await data.json()).data;
}

async function checkAdjacent(string1, string2, token) {
    const url = `https://rooftop-career-switch.herokuapp.com/check?token=${token}`;
    const body = {method: "POST", body: JSON.stringify({   "blocks": [string1,string2]}), headers: {"Content-Type":"application/json"}};
    const data = await fetch(url, body);
    return (await data.json()).message;
}

async function checkResult(arrayOrdenado, token) {
    const url = `https://rooftop-career-switch.herokuapp.com/check?token=${token}`;
    const body = {method: "POST", body: JSON.stringify({   "encoded": arrayOrdenado.join('')}), headers: {"Content-Type":"application/json"}};
    const data = await fetch(url, body);
    return (await data.json()).message;
}

(async function() {
    const token = await getToken();
    const blocks = await getBlocks(token);
    let orderedBlocks = await check(blocks, token);

    if (await checkResult(orderedBlocks, token)) {
        console.log("Lo resolviste correctamente!");
    } else {
        console.log("Todavía puedes intentarlo!");
    }
})();
