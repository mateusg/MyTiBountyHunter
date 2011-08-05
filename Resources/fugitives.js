
Titanium.include("database_config.js");

currentWindow = Titanium.UI.currentWindow;

var entryView = Titanium.UI.createView({
	backgroundColor:"#0060AA",
	width: "100%",
	height: 50,
	top:0
});

var textField = Titanium.UI.createTextField({
	width: 200,
	height: 35,
	left: 0,
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect: false,
	hintText: "Enter the name"
});

textField.addEventListener("return", function(){
	textField.blur();	
});
entryView.add(textField);

var controlsView = Titanium.UI.createView({
	width: "100%",
	height: "auto",
	top: 6,
	right: "3%"
});

var saveButton = Titanium.UI.createButton({
	title: "Save",
	width: 60,
	height: 35,
	right: 0,
	enabled: false
});

controlsView.add(saveButton);

currentWindow.add(entryView);
currentWindow.add(controlsView);

var data = [];
var rows = database.execute("SELECT * FROM prisoners;");

while (rows.isValidRow()){
	data.push({
		title: rows.fieldByName("name"),
		id: rows.fieldByName("id")
	});
	rows.next();
}
rows.close();

var tableView = Titanium.UI.createTableView({
	data: data,
	editable: true,
	top: 50
});

currentWindow.add(tableView);