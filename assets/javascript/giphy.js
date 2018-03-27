function getCopyrightDate() {
    var copyright = document.getElementById('footer-text');

    var todaysDate = new Date();
    copyright.innerHTML = 'Copyright ' + todaysDate.getFullYear() + ' TCJR';
}

function writeToScreen(parentTag, childObject, array) {
    console.log(array);
    console.log(array.length);
    console.log(parentTag);
    console.log(childObject);

    $(parentTag).empty();
    for (var i = 0; i < array.length; i++) {
        $(parentTag).append(childObject);
        $(childObject).text(i);
        console.log(i);
    }
}

function initializeGiphyValues (callback) {
    
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
    setTimeout(function () {writeToScreen(selectHTML, optionObject, giphyRatingsArray);}, 70);
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

//jQuery objects
const imgObject = $("<img class='giphy-images' src='assets/images/test/tcjr.jpg' title='Rated: Y'>");
const buttonObject = $("<button type='submit' class='btn btn-primary giphy-button'>");
const optionObject = $('<option>');

//parent HTML tags for jQuery objects
const btnFormHTML = '#giphy-buttons';
const selectHTML = '.giphy-ratings';
const divHTML = '.giphy-display-buttons';

//get HTML tag info for event listeners
const giphyDisplayHTML = "#giphy-display-submit1";
const searchBtnHTML = '.search-button';
const textBoxHTML = '#search-text';

var database = firebase.database();
var giphyButtonsArray = ["KANYE", "JAY-Z", "BEYONCE", "RIHANNA", "DRAKE"];
var giphyObject = {};
var giphyAPIKey = "";
var giphyImgLimit = 0;
var giphyRatingsArray = [];

$(document).ready(function() {
    
    initializeGiphyValues();

    $(searchBtnHTML).on("click", function(event) {
        event.preventDefault();
        console.log('This is the giphy search array ', $(textBoxHTML).val());

    });

    $(giphyDisplayHTML).on("click", function(event) {
        event.preventDefault();
        console.log('This is the giphy search array ', giphyArray);
    });

});