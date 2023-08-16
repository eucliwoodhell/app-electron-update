const { app, BrowserWindow } = require('electron')
const log = require('electron-log')
const path = require('path')
const { autoUpdater } = require("electron-updater")

let win

log.transports.file.resolvePath = () => {
  return path.join(__dirname, 'logs/main.log')
}

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  log.info('Electron Version: ' + process.versions.electron)
  log.info('Chrome Version: ' + process.versions.chrome)
  log.info('Node Version: ' + process.versions.node)
  log.info('Electron Path: ' + path.join(__dirname, 'index.html'))
  win.loadFile(path.join(__dirname, 'index.html'))
}

app.on('ready', () => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})

autoUpdater.on('update-available', () => {
  log.info('Update available')
})

autoUpdater.on('update-downloaded', () => {
  log.info('Update downloaded')
})
