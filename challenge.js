const utils = require('./utils');

async function check(blocks, token)
{
    let orderedBlocks = [], j = 0, i = 0;
    orderedBlocks.push(blocks[0]);
    blocks.splice(0,1);
    while (blocks.length > 1 && i < blocks.length) {
        if (i === blocks.length - 1 || await utils.checkAdjacent(orderedBlocks[j], blocks[i], token)) {
            orderedBlocks.push(blocks[i]);
            blocks.splice(i,1);
            j++;
            i = 0;
        } else {
            i++;
        }
    }
    orderedBlocks.push(blocks[0]);
    return orderedBlocks;
}

module.exports = {
    check
}