
function closeWindow() {
    const {
        dialog
    } = require('electron').remote
    console.log(dialog)

    remote.BrowserWindow.getFocusedWindow().close();
    console.log("man work");
}

function minimizeWindow() {
    remote.BrowserWindow.getFocusedWindow().minimize();
}