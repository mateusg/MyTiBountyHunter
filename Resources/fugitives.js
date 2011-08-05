Titanium.include("database_config.js");
currentWindow = Titanium.UI.currentWindow;

// Creating controls and fields...
var controlsView = Titanium.UI.createView({
	backgroundColor:"#0060AA",
	width: "100%",
	height: 50,
	top: 0,
	right: 0
});

var saveButton = Titanium.UI.createButton({
	title: "Save",
	width: 60,
	height: 35,
	right: "3%",
	enabled: false
});
controlsView.add(saveButton);

var textField = Titanium.UI.createTextField({
	width: "65%",
	height: 35,
	left: "3%",
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect: false,
	hintText: "Enter the name"
});
controlsView.add(textField);
currentWindow.add(controlsView);

// Creating the table view...
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

// Creating edit and cancel buttons for the page...
var editButton = Titanium.UI.createButton({
	title: "Edit"
});

var okButton = Titanium.UI.createButton({
	title: "OK",
	style: Titanium.UI.iPhone.SystemButtonStyle.DONE
});
currentWindow.setLeftNavButton(editButton);

// Treating events for the textField...
textField.addEventListener("return", function(){
	textField.blur();	

});

textField.addEventListener("change", function(e){
	if (e.value == ""){
		saveButton.enabled = false;	
	} else {
		saveButton.enabled = true;
	}
});

// Treating events for the saveButton...
saveButton.addEventListener("click", function(e){
	if (saveButton.enabled){
		database.execute("INSERT INTO prisoners (name) VALUES (?)", textField.value);
		var last = database.execute("SELECT * FROM prisoners ORDER BY id DESC LIMIT 1");
		tableView.appendRow({
			title: last.fieldByName("name"),
			id: last.fieldByName("id")
		});
		last.close();
		textField.value = "";
		textField.blur();
		saveButton.enabled = false;
	}
});

// Treating eventos for the tableView...
tableView.addEventListener("delete", function(e){
	database.execute("DELETE FROM prisoners WHERE id = ?", e.rowData.id);
});

// Treating events for the edit button...
editButton.addEventListener("click", function(e){
	currentWindow.setLeftNavButton(okButton);
	tableView.editing = true;
});

// Treating events for the OK button...
okButton.addEventListener("click", function(e){
	currentWindow.setLeftNavButton(editButton);
	tableView.editing = false;
});