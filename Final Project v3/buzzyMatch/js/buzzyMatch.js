//source: (1) Memory Card Game - JavaScript Tutorial from freeCodeCamp.org, 8/13/2018 (https://www.youtube.com/watch?v=ZniVgo8U7ek)
// smr = Suzanne M Rizzo code


var cards = document.querySelectorAll(".gameCard");  // (1)
var flippedCard = false; // (1)
var firstCard, secondCard; // (1)
var clicks = 0;  // smr
var cardPairs = 0; // smr


//do on page load -- randomize card position - from (1)
(function shuffle() {
    cards.forEach(card => {
        var randomPos = Math.floor(Math.random() * 18);
        card.style.order = randomPos;
        card.addEventListener('click', flipCard);
        card.classList.add('flutter'); //add starting animation to cards (smr)
    });
})();



function flipCard() {   // from (1)
    this.classList.add('flip', 'freeze');
    if (!flippedCard) {     //first click )
        flippedCard = true;
        firstCard = this;  //set first card 
    } else {
        flippedCard = false;  //second click
        secondCard = this;  //set second card 
        clicks++;  //add to score total after two clicks (smr)
        updateScore();  //(smr)
        checkForMatch(); // from (1)
    }

    function updateScore() { //(smr)
        document.getElementById('score').innerHTML = clicks;
    }

    //do cards match  // from (1)
    function checkForMatch() {
        if (firstCard.dataset.card === secondCard.dataset.card) {  // from (1)
            freezeCards(); // from (1)
            updatePairsCount(); //(smr)
        } else {
            unFlipCards(); // from (1)
        }
    }

    function updatePairsCount() { //(smr)
        cardPairs++;
        checkForWin();
    }

    function checkForWin() { //(smr)
        if (cardPairs === 9) {   //sets max number of pairs in table, adjust if needed for more cards
            var element = document.getElementById("winText");
            element.classList.remove("hidden");
            element.classList.add("visible");
            document.getElementById("playAgain").onclick = function () { location.reload() };
        } else if (cardPairs === 1) {
            var element = document.getElementById("oneText");  //Good start! 
            element.classList.remove("hidden");
            element.classList.add("visible");
            setTimeout(() => {
                element.classList.remove("visible");
                element.classList.add("hidden");
            }, 1800);
        } else if (cardPairs === 3) {
            var element = document.getElementById("threeText"); //Way to go!
            element.classList.remove("hidden");
            element.classList.add("visible");
            setTimeout(() => {
                element.classList.remove("visible");
                element.classList.add("hidden");
            }, 1800);
        } else if (cardPairs === 5) {
            var element = document.getElementById("fiveText");  //Terrific!
            element.classList.remove("hidden");
            element.classList.add("visible");
            setTimeout(() => {
                element.classList.remove("visible");
                element.classList.add("hidden");
            }, 1800);
        } else if (cardPairs === 7) {
            var element = document.getElementById("sevenText");  //Almost there!
            element.classList.remove("hidden");
            element.classList.add("visible");
            setTimeout(() => {
                element.classList.remove("visible");
                element.classList.add("hidden");
            }, 1800);
        }
    }


    //so card don't flip once matched - from (1)
    function freezeCards() {
        firstCard.classList.add('freeze');
        secondCard.classList.add('freeze');
    }


    //not a match - from (1)
    function unFlipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flip', 'freeze');
            secondCard.classList.remove('flip', 'freeze');
        }, 800);
    }
}




