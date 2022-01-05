//--------------------------- Firebase Setup ----------------------------------------------------\\
const firebaseConfig = {
  apiKey: "HIDDEN",
  authDomain: "HIDDEN",
  databaseURL: "HIDDEN",
  projectId: "HIDDEN",
  storageBucket: "HIDDEN",
  messagingSenderId: "HIDDEN",
  appId: "HIDDEN"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var snippetCount = firebase.database().ref('snippets');


//-----------------------------------------------------------------------------------------------\\




// On click function to make buttons act as hyperlinks to these websites
function redirect(buttonID){
	switch(buttonID) {
		case "LinkedIn":
			window.open("https://www.linkedin.com/in/ciaran-melarkey-694469194/", '_blank').focus();
			break;
		case "GitHub":
			window.open("https://github.com/Ciaran98", '_blank').focus();
			break;
		case "GitHubRepo":
			window.open("https://github.com/Ciaran98/Basic-Discord-Bot/tree/master", '_blank').focus();
			break;
		case "Email":
			navigator.clipboard.writeText("ciaran.melarkey@hotmail.com");
			break;
	}
};

// Small joke function to replace background and mouse cursor
var counter = 0;
function replaceBG(){
	counter++;
	if(counter == 10){
		document.getElementById("header-img").style.backgroundImage = "url('assets/img/nessie-bg.png')";
		document.body.style.cursor = ("url(assets/img/nessie-cursor32.png),auto")
	}
};

// Functions for displaying or hiding the code snippet box

function hideElement(id) {
	document.getElementById(id).style.display = "none"
}

function OpenSnippetBox(id) {
	document.getElementById(id).style.display = "block";
	document.getElementById(id).style.overflow = "auto";
	document.getElementById(id).style.maxHeight = document.getElementById(id).scrollHeight + "px";
}
function closeSnippetBox(id) {
	document.getElementById(id).style.maxHeight = null;
	document.getElementById(id).style.overflow = "hidden";
	setTimeout(function(){
		hideElement(id);
	}, 175);
}



// Get the names of the code snippets from the firebase realtime database

function getSnipNames(){
	var dbDocument;
	var docCount = 0;
	snippetCount.on('value', (snapshot) => {
		const data = snapshot.val();
		for (var i = 0; i < Object.keys(data).length; i++) {
			dbDocument = "snip" + docCount;
			appendSnipToSelect(data[dbDocument].name, dbDocument);
			docCount++;
		}
	})
};
getSnipNames();

// Get the data for the snippet box

function getSnipData(name){
	snippetCount.on('value', (snapshot) => {
		const data = snapshot.val();
		appendDataToBox(data[name].data);
	})
};


// Append data to snippet box
function appendDataToBox(data){
	document.getElementById("snip").innerHTML = data;
}


// Append Snippets from firebase realtime database to select menu
function appendSnipToSelect(selectName, selectValue){
	var option = document.createElement("option");
	option.text = selectName;
	option.value = selectValue;
	var select = document.getElementById("snippet-select");
	select.appendChild(option);
};


// Fill the code snippet box with the data from the firebase realtime database
function fillSnippetBox(selVal){
	if(selVal != "default"){
		getSnipData(selVal);
		OpenSnippetBox("snip");
	}
	else{
		closeSnippetBox("snip");
	}
}
