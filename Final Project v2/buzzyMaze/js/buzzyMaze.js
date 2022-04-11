

var myGamePiece;
var myBackground;
var myObstacles = [];
var myScore;
var gameOverText;
var myLevel;



function startGame() {
    myGamePiece = new component(30, 30, "media/cuteBee.png", 10, 120, "image");
    myScore = new component("30px", "Consolas", "black", 480, 40, "text");
    myLevel = new component("30px", "Consolas", "black", 180, 40, "text");
    gameOverText = new component("90px", "Consolas", "orange", 250, 250, "text");
    myGameArea.start();
}


var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 13);

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



    this.crashWith = function (otherobj) {
        var myleft = this.x - 5;
        var myright = this.x + (this.width) - 5;
        var mytop = this.y - 5;
        var mybottom = this.y + (this.height) - 5;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
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
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(175)) {
        x = myGameArea.canvas.width;
        minHeight = 75;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 60;
        maxGap = 275;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(70, height, "media/butterflyNetAdj.png", x, 0, "image"));
        myObstacles.push(new component(70, x - height - gap, "media/branchAdj.png", x, height + gap, "image"));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }

    myScore.update();
    myScore.text = "SCORE:" + myGameArea.frameNo;
    myGamePiece.newPos();
    myGamePiece.update();
    myLevel.update();
    myLevel.text = "Level: " + Math.round(myGameArea.frameNo / 1000);

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
