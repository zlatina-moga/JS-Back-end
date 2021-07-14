const path = require('path')
const fs = require('fs/promises')

module.exports = async() => {
    const idList = [];

    const catsDataBuffer = await fs.readFile(path.join(__dirname, '../database/cats.json'));
    JSON.parse(catsDataBuffer.toString().map(c => idList.push(c.id)))
    
    let id;
    do {
        id = ('00000000' + (Math.random() * 99999999 | 0).toString(16)).slice(-8);
    }
    while (idList[id] != undefined);

    return id;
}

