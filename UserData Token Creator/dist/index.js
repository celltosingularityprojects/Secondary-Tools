"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const fs = require("fs");
const util_1 = require("util");
const crypto_1 = require("crypto");
fs.readFile('./input.txt', 'utf8', async (err, data) => {
    const [playerId, playerToken] = data.split(' ');
    const token = crypto_1.createHmac('sha1', process.env.USERDATA_AUTH).update(playerId).update(playerToken).digest('hex');
    try {
        await util_1.promisify(fs.writeFile)('./output.txt', token);
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=index.js.map