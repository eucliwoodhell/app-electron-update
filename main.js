const { app, BrowserWindow, ipcMain } = require('electron')
const log = require('electron-log')
const path = require('path')
const { autoUpdater } = require("electron-updater")

log.transports.file.resolvePath = () => {
  return path.join(__dirname, 'logs/main.log')
}

log.info('Main process starting...')
log.info('Electron Version: ' + app.getVersion())
let win

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  log.info('Electron Version: ' + process.versions.electron)
  log.info('Chrome Version: ' + process.versions.chrome)
  log.info('Node Version: ' + process.versions.node)
  log.info('Electron Path: ' + path.join(__dirname, 'index.html'))
  win.loadFile(path.join(__dirname, 'index.html'))
}

/* win.once('ready-to-show', () => {
  autoUpdater.checkForUpdatesAndNotify()
}) */

app.on('ready', () => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})

autoUpdater.on('update-available', () => {
  log.info('Update available')
  win.webContents.send('update_available')
})

autoUpdater.on('update-downloaded', () => {
  log.info('Update downloaded')
  win.webContents.send('update_downloaded')
})

autoUpdater.on('update-not-available', () => {
  log.info('Update not available')
})

autoUpdater.on('download-progress', (progressObj) => {
  log.info("Download speed: " + progressObj.bytesPerSecond)
  log.info(progressObj)
})

autoUpdater.on('error', (err) => {
  log.error(err)
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('restart_app', (event) => {
  autoUpdater.quitAndInstall()
})
