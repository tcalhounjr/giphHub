function getCopyrightDate() {
    var copyright = document.getElementById('footer-text');

    var todaysDate = new Date();
    copyright.innerHTML = 'Copyright ' + todaysDate.getFullYear() + ' TCJR';
}

function writeToScreen(parentTag, array) {
    
    console.log(array);
    console.log(array.length);
    console.log(parentTag);

    $(parentTag).empty();
    for (var i = 0; i < array.length; i++) {

        if (parentTag === btnDivHTML) {
            var buttonObject = $("<button type='submit' class='btn btn-primary giphy-button'>");
            buttonObject.attr('id', array[i]);
            buttonObject.appendTo(parentTag);
            buttonObject.text(array[i]);
            console.log(i);
        }
        else if (parentTag === imgDivHTML) {
            var imgObject = $("<img class='giphy-images' src='assets/images/test/tcjr.jpg' title='Rated: Y'>");
            imgObject.attr('id', array[i] + '-' + i);
            imgObject.appendTo(parentTag);
            imgObject.text(array[i]);
            console.log(i);
        }
        else {
            var optionObject = $('<option>');
            optionObject.attr('value', array[i]);
            optionObject.appendTo(parentTag);
            optionObject.text(array[i]);
            console.log(i);
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
        url: query,
        method: "GET"
      }).then(function(response) {
        var giphyImgArray = response;
        console.log(giphyImgArray);
        writeToScreen(imgDivHTML, giphyImgArray);
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




//parent HTML tags for jQuery objects
const btnDivHTML = '.giphy-display-buttons';
const selectHTML = '.giphy-ratings';
const imgDivHTML = '.giphy-display-images';

//get HTML tag info for event listeners
const searchBtnHTML = '.search-button';
const textBoxHTML = '#search-text';
const giphyBtn = '.giphy-button';

//set GIPHY query button array to some initial values
var giphyButtonsArray = ["KANYE", "JAY-Z", "BEYONCE", "RIHANNA", "DRAKE"];

//declare DB vars
var database = firebase.database();
var giphyObject = {};
var giphyAPIKey = "";
var giphyImgLimit = 0;
var giphyRatingsArray = [];
var test = "zDsAL6BTxnuTal7z34N59Pxvf2BOxA0b";

initializeGiphyValues();

$(document).ready(function() {
    
    
    setTimeout(function () {writeToScreen(selectHTML, giphyRatingsArray);}, 500);
    writeToScreen(btnDivHTML, giphyButtonsArray);
    
    $(searchBtnHTML).on("click", function(event) {
        event.preventDefault();
        var searchString = $(textBoxHTML).val().trim();
        var searchFilter = $(selectHTML).val();
        giphyButtonsArray.push(searchString);
        writeToScreen(btnDivHTML, giphyButtonsArray);
    });

    $(giphyBtn).on("click", function(event) {
        event.preventDefault();
        var searchString = $(this).text();
        var searchFilter = $(selectHTML).val();
        console.log(searchFilter);
        var giphyQueryURL = "https://api.giphy.com/v1/gifs/search?" + 'api_key=' + giphyAPIKey + '&q=' + searchString + '&limit=' + giphyImgLimit + '&offset=0' + '&rating=' + searchFilter;
        console.log('New query string: ', giphyQueryURL);
        fetchGIFs(giphyQueryURL);
    });

});