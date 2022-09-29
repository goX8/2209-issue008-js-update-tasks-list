const path = require("path");

const fsFull = require("fs");
// import fs from 'fs/promises';

const fs = fsFull.promises;

// const __dirname = dirname(fileURLToPath(import.meta.url));


async function readFileText({ filePath }) {
    const file = path.join(__dirname, filePath)
    // --read-file
    try {
        const data = await fs.readFile(file, 'utf8')
        return data;
    }
    catch (err) {
        console.log(err)
        return false;
    }

    return false;
}

async function saveJson({ manyText, filePath, isNewFile = false }) {
    // ------------------------------------
    // --path
    const filePathFull = path.join(__dirname, filePath);
    // ------------------------------------
    // create-a-directory-if-it-doesnt-exist
    // https://stackoverflow.com/questions/21194934/how-to-create-a-directory-if-it-doesnt-exist-using-node-js
    // if (!fsFull.existsSync(path.dirname(filePathFull))) {
    //     fsFull.mkdirSync(dirPath, { recursive: true });
    // }
    // ------------------------------------
    // clear-data;
    if (isNewFile) {
        await fs.truncate(filePathFull).catch(err => true);
    }
    // ------------------------------------
    // --append-data
    await fs.appendFile(filePathFull, manyText).catch(function (err) {
        console.error(err);
    });

    return true;
}

module.exports = { saveJson, readFileText };

