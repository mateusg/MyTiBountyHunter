// This sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

Titanium.include("database_config.js");

// Create tab group
var tabGroup = Titanium.UI.createTabGroup();

// Create fugitives window and tab
var fugitivesWindow = Titanium.UI.createWindow({  
    title:'Fugitives',
    backgroundColor:'#fff',
    url: 'fugitives.js'
});
//Titanium.include("fugitives.js");

var fugitivesTab = Titanium.UI.createTab({
    title:'Fugitives',
    window:fugitivesWindow
});

tabGroup.addTab(fugitivesTab);

// Create captured window and tab
var capturedWindow = Titanium.UI.createWindow({  
    title:'Captured',
    backgroundColor:'#fff'
});

var capturedTab = Titanium.UI.createTab({
    title:'Captured',
    window:capturedWindow
});
  
tabGroup.addTab(capturedTab);

tabGroup.open();