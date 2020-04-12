const{ remote, ipcRenderer} = require('electron')

document.getElementById('close-btn').addEventListener('click', () => {
    remote.getCurrentWindow().close()
})

document.getElementById('min-btn').addEventListener('click', () => {
    console.log('bruh');
    remote.getCurrentWindow().minimize();
})