const { ipcRenderer } = require('electron')
const version = document.getElementById('info')

ipcRenderer.send('app_version')
ipcRenderer.on('app_version', (event, arg) => {
  ipcRenderer.removeAllListeners('app_version')
  version.innerText = 'Version ' + arg.version
})
