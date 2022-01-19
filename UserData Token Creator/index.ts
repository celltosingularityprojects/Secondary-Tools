import 'dotenv/config';
import { readFile } from 'fs';
import { writeFile } from 'fs/promises';
import { createHmac } from 'crypto';

readFile('./input.txt', 'utf8', async (err, data) => {
    const [playerId, playerToken] = data.split(' ');
    const token = createHmac('sha256', process.env.USERDATA_AUTH).update(playerId).update(playerToken).digest('hex');
    try {
        await writeFile('./output.txt', token);
    } catch (err) { console.log(err) }
});