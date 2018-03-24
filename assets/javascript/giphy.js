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


var giphyArray = ["KANYE", "JAY-Z", "BEYONCE", "RIHANNA", "DRAKE"];

$("#fetch").on("click", function(event) {
    event.preventDefault();
    console.log('This is the giphy search array ', giphyArray);
});