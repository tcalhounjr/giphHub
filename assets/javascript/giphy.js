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
        var jQueryObject = childObject;
        jQueryObject.appendTo(parentTag);
        jQueryObject.text(array[i]);
        console.log(i);

        if (parentTag === btnDivHTML) {
            childObject.attr('id', array[i]);
        }
        else if (parentTag === imgDivHTML) {
            childObject.attr('id', array[i] + '-' + i);
        }
    }
}

function initializeGiphyValues () {
    
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
    });
}

function fetchGIFs (query) {

    $.ajax({
        url: gdpQueryURL,
        method: "GET"
      }).then(function(response) {
        countryGDP = response[1][0].value;
        console.log(response);
        console.log("GDP IS ", countryGDP);
        writeToScreen(gdpHTML, countryGDP.toLocaleString());
    });
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
const btnDivHTML = '.giphy-display-buttons';
const selectHTML = '.giphy-ratings';
const imgDivHTML = '.giphy-display-images';

//get HTML tag info for event listeners
const searchBtnHTML = '.search-button';
const textBoxHTML = '#search-text';
const giphyBtn = '.giphy-button';

//set GIPHY query URL 
var giphyQueryURL = "https://api.giphy.com//v1/gifs/search?";
var giphyButtonsArray = ["KANYE", "JAY-Z", "BEYONCE", "RIHANNA", "DRAKE"];

//declare DB vars
var database = firebase.database();
var giphyObject = {};
var giphyAPIKey = "";
var giphyImgLimit = 0;
var giphyRatingsArray = [];

initializeGiphyValues();

$(document).ready(function() {
    
    setTimeout(function () {writeToScreen(selectHTML, optionObject, giphyRatingsArray);}, 500);
    writeToScreen(btnDivHTML, buttonObject, giphyButtonsArray);
    
    $(searchBtnHTML).on("click", function(event) {
        event.preventDefault();
        var searchString = $(textBoxHTML).val().trim();
        var searchFilter = $(selectHTML).val();
        giphyButtonsArray.push(searchString);
        writeToScreen(btnDivHTML, buttonObject, giphyButtonsArray);
        giphyQueryURL += 'api_key=' + giphyAPIKey + '&limit=' + giphyImgLimit + '&q=' + searchString + '&rating=' + searchFilter;
        console.log(giphyQueryURL);
        console.log('This is the giphy search array ', $(textBoxHTML).val());

    });

    $(giphyBtn).on("click", function(event) {
        event.preventDefault();
        var searchString = $(this).text();
        var searchFilter = $(selectHTML).val();
        giphyQueryURL += 'api_key=' + giphyAPIKey + '&limit=' + giphyImgLimit + '&q=' + searchString + '&rating=' + searchFilter;
        writeToScreen(imgDivHTML, imgObject, giphyButtonsArray);
        console.log('New query string: ', giphyQueryURL);
    });

});