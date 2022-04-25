
//code from Lesson 9 CIT 190, "smr" notes Suzanne Rizzo code adjustments


var myBackground;
var myObstacles = [];
var myFlowers = [];
var points = 0;

function startGame() {
    myGamePiece = new component(40, 40, "media/cuteBee.png", 10, 120, "image");
    myScore = new component("30px", "Cambria", "black", 220, 40, "text");
    myLevel = new component("30px", "Cambria", "black", 100, 40, "text");
    gameOverText = new component("6em", "Cambria", "darkviolet", 175, 260, "text");
    playAgainText = new component("4em", "Cambria", "darkviolet", 225, 760, "text");
    myGameArea.start();
    var element = document.getElementById("start");
    element.classList.add("hidden");
}


var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 810
        this.canvas.height = 525
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 15);

        window.addEventListener('mousedown', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })

        window.addEventListener('mouseup', function (e) {
            myGameArea.x = false;
            myGameArea.y = false;
        })

        window.addEventListener('touchstart', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })

        window.addEventListener('touchend', function (e) {
            myGameArea.x = false;
            myGameArea.y = false;
        })

    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
    }

    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }


    this.crashWith = function (myObstacles) {   //smr
        var myleft = this.x - 3;
        var myright = this.x + (this.width) - 3;
        var mytop = this.y - 3;
        var mybottom = this.y + (this.height) - 3;
        var otherleft = myObstacles.x;
        var otherright = myObstacles.x + (myObstacles.width);
        var othertop = myObstacles.y;
        var otherbottom = myObstacles.y + (myObstacles.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

    this.crashWith = function (myFlowers) {   //smr
        var beeleft = this.x - 1;
        var beeright = this.x + (this.width) - 1;
        var beetop = this.y - 1;
        var beebottom = this.y + (this.height) - 1;
        var flowerleft = myFlowers.x;
        var flowerright = myFlowers.x + (myFlowers.width);
        var flowertop = myFlowers.y;
        var flowerbottom = myFlowers.y + (myFlowers.height);
        var flowercrash = true;
        if ((beebottom < flowertop) ||
            (beetop > flowerbottom) ||
            (beeright < flowerleft) ||
            (beeleft > flowerright)) {
            flowercrash = false;

        }
        return flowercrash;

    }
}



function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            gameOverText.text = "GAME OVER!";
            gameOverText.update();
            myScore.update();
            var newGame = document.getElementById("playAgain1");
            newGame.classList.add("visible");
            document.getElementById("playAgain1").onclick = function () { location.reload() };
            return;
        }
    }
    for (i = 0; i < myFlowers.length; i += 1) {   //smr
        if (myGamePiece.crashWith(myFlowers[i])) {
            myFlowers.splice(i, 1);
            points++;
            return;
        }
    }



    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(220)) {
        x = myGameArea.canvas.width;
        minHeight = 75;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 80;
        maxGap = 265;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(70, height, "media/butterflyNetAdj.png", x, 0, "image"));
        myObstacles.push(new component(50, x - height - gap, "media/branchAdj.png", x, height + gap, "image"));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    if (myGameArea.frameNo == 1 || everyinterval(240)) {    //smr
        x = myGameArea.canvas.width;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        x = Math.floor(Math.random() * (700));
        y = Math.floor(Math.random() * (500));
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myFlowers.push(new component(30, 30, "media/blueFlowerAdj.png", x, y, "image"));
    }
    if (myGameArea.frameNo == 1 || everyinterval(275)) {    //smr
        x = myGameArea.canvas.width;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        x = Math.floor(Math.random() * (600));
        y = Math.floor(Math.random() * (400));
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myFlowers.push(new component(30, 30, "media/orangeDaisy.png", x, y, "image"));
    }
    for (i = 0; i < myFlowers.length; i += 1) {
        myFlowers[i].x += -1;
        myFlowers[i].newPos();
        myFlowers[i].update();
    }


    myScore.update();
    myScore.text = "Score:" + points; //smr
    myGamePiece.newPos();
    myGamePiece.update();
    myLevel.update();
    myLevel.text = "Level:" + 1   //smr
    checkForWin(); //smr

}

function checkForWin() {  //smr
    if (points === 5 || points === 6 || points === 7 || points === 8 || points === 9) {
        myLevel.text = "Level:" + 2
    }

    if (points === 10 || points === 11 || points === 12 || points === 13 || points === 14) {
        myLevel.text = "Level:" + 3
    }

    if (points === 15 || points === 16 || points === 17 || points === 18 || points === 19) {
        myLevel.text = "Level:" + 4
    }

    if (points === 20) {
        myGameArea.stop();
        gameOverText.text = "You Win!";
        gameOverText.update();
        var newGame = document.getElementById("playAgain2");
        newGame.classList.add("visible");
        document.getElementById("playAgain2").onclick = function () { location.reload() };
    }

}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}


function moveup() {
    myGamePiece.speedY -= 3;
}

function movedown() {
    myGamePiece.speedY += 3;
}

function moveleft() {
    myGamePiece.speedX -= 3;
}

function moveright() {
    myGamePiece.speedX += 3;
}

function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}


