const {app, Menu, Tray, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const storage = require('electron-json-storage');

var spawn = require('child_process').spawn;
var tray, mainWindow = null;


app.on('ready', () => {
    createMainWindow();
    createTrayIcon();
});

/**
 * Creates the app main window
 */
function createMainWindow() {
    // Creates the main window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        icon: __dirname + '/assets/img/app_icon.ico'
    });

    // Hides the main window menu
    mainWindow.setMenu(null);

    // Loads the main window template
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Catch minimize and close events and ensures that main window get hidden
    // since we are going allow closing the app via try icon only
    mainWindow.on('minimize',function(event){
        event.preventDefault()
        mainWindow.hide();
    });

    mainWindow.on('close', function (event) {
        if( !app.isQuiting){
            event.preventDefault()
            mainWindow.hide();
        }
        return false;
    });
}

/**
 * Creates the app tray icon
 */
function createTrayIcon() {
    // Creates the tray icon and ensures that clicking on it will show the app main window
    tray = new Tray( __dirname + '/assets/img/tray_icon.ico' ).on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    });

    // Fetches the user selected timzones and builds the tray icon menu with
    // user timezones
    storage.get('selected_timezones', function(error, data) {
        // Gets current timezone
        var response = spawn('cmd.exe', ['/c', 'tzutil', '/g']);
        // Build tray icon menu items
        response.stdout.on('data', function(currentTimezone) {
            var menus = [];
            for(i=0; i<data.length; i++) {
                var checked = false;
                if (currentTimezone == data[i]) {
                    checked = true;
                }

                menus.push({label: data[i], type: 'radio', checked : checked, click: changeTimeZone});
            }

            menus.push({ label: 'Exit', type : 'separator'});

            // Adds exit menu item that allow closing the application from try icon
            menus.push({ label: 'Exit', click:  function(){
                app.isQuiting = true;
                app.quit();
            }
            });

            const contextMenu = Menu.buildFromTemplate(menus);

            tray.setToolTip('Timezone Switcher');
            tray.setContextMenu(contextMenu);
        });
    });
}

/**
 * Changes (Windows OS) Timezone when the user clicks on
 * any timezone from tray icon timezones list using windows
 * command line utility tzutil.
 *
 * @param menuItem
 *   Contains menuItem.label which is passed to tzutil to change the timezone
 * @param browserWindow
 * @param event
 */
function changeTimeZone(menuItem, browserWindow, event) {
    spawn('cmd.exe', ['/c', 'tzutil', '/s', menuItem.label]);
}

