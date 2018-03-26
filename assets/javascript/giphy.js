function getCopyrightDate() {
    var copyright = document.getElementById('footer-text');

    var todaysDate = new Date();
    copyright.innerHTML = 'Copyright ' + todaysDate.getFullYear() + ' TCJR';
}

function buildGameBoard(gameArray) {
    gameArray = shuffle(gameArray);
    console.log('The gameArray has ',gameArray.length, ' elements');

    for (var i = 0; i < gameArray.length; i++) {
        var divHTML = $("<div class='radio'>");
        var labelHTML = $("<label class='radio-label'>");
        var radioHTML = $("<input type='radio' name='optionsRadios'>");

        divHTML.appendTo(radioDIV);
        labelHTML.appendTo(divHTML);
        radioHTML.prependTo(divHTML);
        
        radioHTML.attr('id', 'optionsRadios' + gameElement);
        radioHTML.attr('value', gameArray[i]);
        labelHTML.text(gameArray[i]);
    }
}

//INITIALIZE FIREBASE CONNECTION TO ACCESS 

var config = {
    apiKey: "AIzaSyCnPRe0G27hZE3Su-WIh43LjgMYaTqVaDc",
    authDomain: "giphhub-hw.firebaseapp.com",
    databaseURL: "https://giphhub-hw.firebaseio.com",
    projectId: "giphhub-hw",
    storageBucket: "giphhub-hw.appspot.com",
    messagingSenderId: "473626731056"
  };
  firebase.initializeApp(config);

//CREATE GLOBAL VARIABLES TO USE THROUGHOUT APP

const giphyDisplayHTML = "#giphy-display-submit1";
const imgHTML = $('<img>');
const imgFormHTML = '#giphy-buttons';


var giphyArray = ["KANYE", "JAY-Z", "BEYONCE", "RIHANNA", "DRAKE"];
var database = firebase.database();
var giphyObject = {};
var giphyAPIKey = "";
var giphyImgLimit = 0;
var giphyRatingsArray = [];

database.ref('giphyObject').on('value', function(snapshot) {
    giphyObject = snapshot.val();
    giphyAPIKey = giphyObject.apiKey;
    giphyImgLimit = parseInt(giphyObject.imgLimit);
    console.log(giphyAPIKey);
    console.log(giphyImgLimit);
});

database.ref('giphyRatings').on('value', function(snapshot) {
    
    giphyRatingsArray = snapshot.val();
    console.log(giphyRatingsArray);
    
    for (var i = 0; i < giphyRatingsArray.length; i++) {
        console.log(giphyRatingsArray[i]);
    }

});


$(giphyDisplayHTML).on("click", function(event) {
    event.preventDefault();
    console.log('This is the giphy search array ', giphyArray);
});