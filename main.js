var nicolefacts = [];

function makeApiCall() {
	var params = {
	    // The ID of the spreadsheet to retrieve data from.
	    spreadsheetId: '1bg2Sz7MwnyUJXCdxJHL-f_wiyY5nJWiMYfyJgRzpzqU',

	    // The A1 notation of the values to retrieve.
	    range: 'A2:A',
  };

	var request = gapi.client.sheets.spreadsheets.values.get(params);
  	request.then(function(response) {

  		// update our list of facts
    	nicolefacts = response.result.values;

    	// bind onclick functionality
    	document.getElementById('main').onclick = function() { setFact(nicolefacts); }
    	
    	// initialize facts
    	setFact(nicolefacts);

  		}, function(reason) {
    		console.error('error: ' + reason.result.error.message);
  		});
}

function initClient() {
	var API_KEY = 'AIzaSyBlvzcnpxN_RVtfF-13KtqfmJ4v0MTTok8';
	var CLIENT_ID = '708740926980-g0p1m7uto30ronppolbq6cguf9leg29c.apps.googleusercontent.com';
	var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

	gapi.client.init({
	    'apiKey': API_KEY,
	    'clientId': CLIENT_ID,
	    'scope': SCOPE,
	    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
	}).then(function() {
	    makeApiCall();
	});
}

function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
  	if (isSignedIn) {
    	makeApiCall();
  	}
}

function handleSignInClick(event) {
  	gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
	  gapi.auth2.getAuthInstance().signOut();
}

function setFact(array) {

	// pick a (pseudo)random fact
	var index = Math.round( Math.random() * (nicolefacts.length-1) );

	// update the div with the fact
	var mainDiv = document.getElementById('main');
	mainDiv.lastElementChild.innerText = array[index];
}