//1) taken from Word Search Game using jQuery by  Crypters Infotech Parts 1 - 12 (published  1/20/2020 - 8/2/2021)
//Suzanne M Rizzo code

var myWords = ["BUZZY", "SPRING", "TULIP", "DAISY", "SUNNY", "FLOWER", "BUMBLE", "GARDEN"];  //1)

var score = 0;


$(document).ready(function () {   //1)
    arrangeGame();
    $(".word").click(function () {
        $(this).addClass("colorBlue");
        selectedWord = $(this).html();
        score++;
        checkForWin();

    });

});

function checkForWin() {  //smr
    if (score === 41) {
        var element = document.getElementById("winText");
        element.classList.remove("hidden");
        element.classList.add("visible");
    }
};



function arrangeGame() { //1)
    $.each(myWords, function (key, item) {
        $("#hint").append("<p>" + item + "<input type='checkbox'>" + "</p>"); //1  //smr
    });

};



