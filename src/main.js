const updateAllTasks = require('./httpClient/updateAllTasks.js');

async function main() {
    await updateAllTasks();
}

main().catch(err => {
    console.error(err);
})