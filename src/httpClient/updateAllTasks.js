const libFileDB = require('../fileDB/libFileDB.js')

async function main() {
    // NOTE: mockup data
    const mock_result = ['xx', 'zz'];
    const mainFilePath = '..//env/all.js';

    // =====
    // TODO: code-here
    // =====

    // NOTE: guideline
    // =====
    // ,read-oldFile
    const oldListText = await libFileDB.readFileText({
        filePath: mainFilePath,
    })
    if (oldListText === false) {

        console.log('err::: --- readFile ---');

        hasErr = true;
        return hasErr
    }
    // ,getListData
    posListStart = oldListText.indexOf('[') //fix
    posListEnd = oldListText.indexOf(']', posListStart) //fix
    // oldListJson = JSON.parse(oldListText.substring(posListStart, posListEnd)) //fix

    // // ,check-diff(oldListJson == mock_result)
    // const mock_isDiff = true; //fix

    // // if-diff
    // if (mock_isDiff) {
    //     // ::save
    //     // ,backup-oldFile
    //     await libFileDB.saveJson({
    //         manyText: oldListText,
    //         // filePath: 'src/env/all.bakYYYYMM-DD--HH_mm.js',
    //         filePath: '../env/all.bak202209-29--HH_mm.js',
    //         isNewFile: true,
    //     })

    //     // replace-data
    //     // ,del-oldList(fromString)
    //     let newListText = '...';
    //     // ,insert-newList(string)
    //     newListText = '...';

    //     // ,saveFile(newData)
    //     await libFileDB.saveJson({
    //         manyText: newListText,
    //         filePath: mainFilePath,
    //         isNewFile: true,
    //     })

    //     // DEBUG: update-data on:
    //     const timeDateTime_bangkok = (new Date()).toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
    //     console.log('update-data on: ', timeDateTime_bangkok);
    // }
}

// main().catch(err => {
//     console.error(err);
// })

module.exports = main;