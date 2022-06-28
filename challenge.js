const utils = require('./utils');

async function check(blocks, token)
{
    let orderedBlocks = [], j = 0, i = 0;
    orderedBlocks.push(blocks[0]);
    blocks.splice(0,1);
    while (i < blocks.length) {
        if (await utils.checkAdjacent(orderedBlocks[j], blocks[i], token)) {
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

module.exports = {
    check
}