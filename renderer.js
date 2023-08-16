const { ipcRenderer } = require('electron')
const version = document.getElementById('info')

const notification = document.getElementById('notification')
const message = document.getElementById('message')
const restartButton = document.getElementById('restart-button')
const closeButton = document.getElementById('close-button')

restartButton.addEventListener('click', restartApp)
closeButton.addEventListener('click', closeNotification)

ipcRenderer.send('app_version')
ipcRenderer.on('app_version', (event, arg) => {
  ipcRenderer.removeAllListeners('app_version')
  version.innerText = 'Version ' + arg.version
})

ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available')
  message.innerText = 'A new update is available. Downloading now...'
  notification.classList.remove('hidden')
})

ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded')
  message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?'
  restartButton.classList.remove('hidden')
  notification.classList.remove('hidden')
})

function closeNotification() { // eslint-disable-line
  notification.classList.add('hidden')
}

function restartApp() { // eslint-disable-line
  ipcRenderer.send('restart_app')
}
