const utils = require("./utils");
const challenge = require("./challenge");

(async function() {
    const token = await utils.getToken();
    const blocks = await utils.getBlocks(token);
    const orderedBlocks = await challenge.check(blocks, token);

    if (await utils.checkResult(orderedBlocks, token)) {
        console.log("Lo resolviste correctamente!");
    } else {
        console.log("Todavía puedes intentarlo!");
    }
})();
