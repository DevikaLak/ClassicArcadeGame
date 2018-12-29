// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    this.render();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function() {
  this.render();
};

Player.prototype.reset = function() {
  console.log('Reset');
  this.x = allowedPlayerRangeX[Math.floor(Math.random() * allowedPlayerRangeX.length)];
  this.y = allowedPlayerRangeY[Math.floor(Math.random() * allowedPlayerRangeY.length)];
  this.render();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(code) {
    switch (code) {
        case 'left':
            if (this.x - 101 < 0) {
                this.x = 0;
            } else {
                this.x = this.x - 101;
            }
            break;
        case 'right':
            if (this.x + 101 > 404) {
                this.x = 404;
            } else {
                this.x = this.x + 101;
            }
            break;
        case 'up':
            if (this.y - 83 < 0) {
                this.y = 0;
            } else {
                this.y = this.y - 83;
            }
            break;
        case 'down':
            if (this.y + 83 > 415) {
                this.y = 415;
            } else {
                this.y = this.y + 83;
            }
            break;
    }

    //Check for winning criteria
    if (this.y === 0) {
      onGameCompletion();
    }
};

//Placement range for enemy in y-axis
const allowedEnemyRange = [225, 142, 59];
const allowedEnemySpeed = [232, 121, 350];

const allowedPlayerRangeY = [308, 391];
const allowedPlayerRangeX = [0, 100, 200, 300, 400];

//Generate Enemies
function manageEnemies(count, allEnemies) {
  for (let i = 0; i < count; i++) {
    allEnemies.push(newEnemy());
  }
}

function newEnemy() {
  return new Enemy(0, allowedEnemyRange[Math.floor(Math.random()*allowedEnemyRange.length)], allowedEnemySpeed[Math.floor(Math.random()*allowedEnemySpeed.length)]);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

window.setInterval(function () {manageEnemies(3, allEnemies)}, 2000);
let player = new Player(allowedPlayerRangeX[Math.floor(Math.random()*allowedPlayerRangeX.length)], allowedPlayerRangeY[Math.floor(Math.random()*allowedPlayerRangeY.length)]);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

player.handleInput(allowedKeys[e.keyCode]);
});

//START: COMPLETION POP UP CODE
/*Sets values to show on game completion and loads it in a pop up*/
function onGameCompletion() {
  //Clicks the anchor tag which displays the pop up
  const popUpLink = document.querySelector('.anchor');
  popUpLink.click();
}
//END: COMPLETION POP UP CODE
