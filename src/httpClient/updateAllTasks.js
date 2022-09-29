const libFileDB = require("../fileDB/libFileDB.js");

async function main() {
  // NOTE: mockup data
  const mock_result = ["xx"];
  const mainFilePath = "../env/all.js";
  const timeDateTime_bangkok = new Date().toLocaleString("en-029", {
    timeZone: "Asia/Bangkok",
  });

  //time split for backup file name
  let time = timeDateTime_bangkok.split(" ")[1].split(":");
  let mdy = timeDateTime_bangkok.split(" ")[0];
  mdy = mdy.split("/");
  let day = parseInt(mdy[1]);
  let month = parseInt(mdy[0]);
  month.toString().length = 1 ? (month = `0${month}`) : (month = month);

  let year = parseInt(mdy[2]);
  let hour = parseInt(time[0]);
  let minute = parseInt(time[1]);

  // NOTE: guideline
  // =====
  // ,read-oldFile
  const oldListText = await libFileDB.readFileText({
    filePath: mainFilePath,
  });
  if (oldListText === false) {
    console.log("err::: --- readFile ---");

    const hasErr = true;
    return hasErr;
  }
  // ,getListData
  posListStart = oldListText.indexOf("[");
  posListEnd = oldListText.indexOf("]", posListStart);
  oldListJson = oldListText.substring(posListStart + 1, posListEnd); //FIXED

  // ,check-diff(oldListJson == mock_result)
  let mock_isDiff = true; //FIXED
  if (
    oldListJson ===
    JSON.stringify(mock_result).substring(
      JSON.stringify(mock_result).indexOf("[") + 1,
      JSON.stringify(mock_result).indexOf("]")
    )
  ) {
    console.log("err::: --- not diff ---");
    return (mock_isDiff = false);
  }

  // if-diff
  if (mock_isDiff) {
    // ::save
    // ,backup-oldFile
    await libFileDB.saveJson({
      manyText: oldListText,
      // filePath: 'src/env/all.bakYYYYMM-DD--HH_mm.js',
      filePath: `../env/all.bak${year}${month}-${day}--${hour}_${minute}.js`,
      isNewFile: true,
    });

    // replace-data
    // ,del-oldList(fromString)
    let newListText = "....";
    typeof newListText === "object"
      ? (newListText = JSON.stringify(newListText).match(/\[(.*?)\]/)[1])
      : (newListText = JSON.stringify(newListText));
    // ,insert-newList(string)
    newListText = oldListText.replace(oldListJson, newListText);
    // ,saveFile(newData)
    await libFileDB.saveJson({
      manyText: newListText,
      filePath: mainFilePath,
      isNewFile: true,
    });

    // DEBUG: update-data on:

    console.log("update-data on: ", timeDateTime_bangkok);
  }
}

module.exports = main;
