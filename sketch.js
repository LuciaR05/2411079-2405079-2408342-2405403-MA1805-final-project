//Initializing variables for tilemap 

let tilemap = [];
let numDown = 10;
let numAcross = 13;
let tileSize = 50;
let textures = []; 

//Initializing start screen and sound variables
let stage = 0;
let song ;


//Graphic map and tile rules 
let graphicMap = [

//         THIS IS OUR Y AXIS
//0 1  2  3  4  5  6  7  8  9  10 11 12
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
[0, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0], // 1
[0, 6, 1, 6, 1, 1, 10, 1, 1, 5, 1, 5, 0], // 2
[0, 4, 0, 4, 0, 0, 9, 0, 0, 2, 0, 2, 0], // 3
[0, 4, 0, 8, 3, 3, 11, 3, 3, 7, 0, 2, 0], // 4    THIS IS OUR X AXIS
[0, 4, 0, 4, 0, 0, 9, 0, 0, 2, 0, 2, 0], // 5
[0, 4, 0, 4, 0, 0, 9, 0, 0, 2, 0, 2, 0], // 6
[0, 8, 3, 8, 3, 3, 11, 3, 3, 7, 3, 7, 0], // 7
[0, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 0], // 8
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 9 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10 


]

let tileRules = [
    
//         THIS IS OUR Y AXIS
//0 1  2  3  4  5  6  7  8  9  10 11 12
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
[0, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0], // 1
[0, 6, 1, 6, 1, 1, 10, 1, 1, 5, 1, 5, 0], // 2
[0, 4, 0, 4, 0, 0, 9, 0, 0, 2, 0, 2, 0], // 3
[0, 4, 0, 8, 3, 3, 11, 3, 3, 7, 0, 2, 0], // 4    THIS IS OUR X AXIS
[0, 4, 0, 4, 0, 0, 9, 0, 0, 2, 0, 2, 0], // 5
[0, 4, 0, 4, 0, 0, 9, 0, 0, 2, 0, 2, 0], // 6
[0, 8, 3, 8, 3, 3, 11, 3, 3, 7, 3, 7, 0], // 7
[0, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 0], // 8
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 9 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10 

]

//Initialising variables for player one - monkey
let monkey
let monkeySprite;
let monkeySpeed = 50; 
let monkeySize = tileSize; 

//For player two - bear
let bear;
let bearSprite;
let bearSpeed = 50; 
let bearSize = tileSize; 

// For ball
let ball;
let ballSprite;
let ballSpeed = 1.45;
let ballSize = tileSize ; 
let xpos, ypos; // Starting position of shape 

// Initializing variables for scores
let monkeyScore = 0;
let bearScore = 0;


function preload() {

song = loadSound('jungle_music.mp3') ;


    //Tile Textures
    textures [0] = loadImage("grass.png") ; 
    textures [1] = loadImage("grass1.png") ; 
    textures [2] = loadImage("grass2.png") ; 
    textures [3] = loadImage("grass3.png") ; 
    textures [4] = loadImage("grass4.png") ; 
    textures [5] = loadImage("grassUR.png") ; 
    textures [6] = loadImage("grassUL.png") ; 
    textures [7] = loadImage("grassBR.png") ; 
    textures [8] = loadImage("grassBL.png") ; 
    textures [9] = loadImage("fence1.png") ; 
    textures [10] = loadImage("fence2.png") ; 
    textures [11] = loadImage("fence3.png") ; 


//Loading sprites for player characters
    monkeySprite = loadImage("monkey.png");
    bearSprite = loadImage ("bear.png");
    ballSprite = loadImage ("ball.png");
}

function setup() {
createCanvas (650,500) ;
    song.loop() ; //making sure the sound is not keyPressed hence it is just in a loop playing repeatedly


let tileID = 0; // Sets our tileID for the first tile that we make 

    
//Creates all tiles
    for (let across = 0; across < numAcross; across++) {
tilemap[across] = [];
    for (let down = 0; down < numDown; down++) {
//Setting Texture For Tile
    let textureNum = graphicMap[down][across];

//Initialising Tile
    tilemap[across][down] = new Tile(textures[textureNum], across, down, tileSize, tileID); // THIS LINE CREATES OUR NEW TILE!
    tileID++;
        }
} //Tile creation finished


//Create Player
    monkey = new Monkey(monkeySprite, 2, 5, tileSize, monkeySpeed, tileSize, tileRules);
    bear = new Bear(bearSprite, 10, 5, tileSize, bearSpeed, tileSize, tileRules);
    ball = new Ball(ballSprite, ballSize, ballSpeed, tileSize, tileRules);

ball.setDirection(); //Setting intial direction for ball
}

function draw() {
    background(0);

//  Loop through all tiles in the tilemap and display them
    for (let across = 0; across < numAcross; across++) {
        for (let down = 0; down < numDown; down++) {

        //Calling the display() and debug() method for the current tile 
        tilemap[across][down].display(); 
        tilemap[across][down].debug(); 
        }
    }

// Check collision between ball and players
monkey.checkCollisionWithBall(ball);
bear.checkCollisionWithBall(ball);
    

// Finish looping through all tiles within each draw() loop
// Display and move the monkey    
    monkey.display();
    monkey.move();

// Display, move, and update the position of the bear
    bear.display();
    bear.move();
    bear.updatePosition();

// Display, move, and update the ball
    ball.display();
    ball.move();
    ball.update();
    
// Displays scores
    textSize(20);
    fill(222, 49, 99);
    textFont('Courier');
    text("MONKEY: " + monkeyScore, 20, 30);
    text("BEAR: " + bearScore, 545, 30);

// Check if either player has reached the winning score
if (monkeyScore >= 5 || bearScore >= 5) {
    // Displays end screen
    fill(222, 49, 99);
    textSize(30);
    textAlign(CENTER, CENTER);
    let winner = monkeyScore >= 5 ? "Monkey" : "Bear";
    text(`Wild Serve! ${winner} Wins!`, width / 2, height / 2);

    fill(148, 0, 211);
    textSize(20);
    text("Press the spacebar to play again.", width / 2, height / 2 + 40);
}

// Check if the game is in the initial stage
    if (stage === 0) {
        // Display splash screen
        background(168,214,154);
        fill(77,112,71);
        textFont('Marker felt');
        textSize(65);
        text('WILD SERVE', width / 4.35, height / 2.3);
        fill(112, 103, 71);
        textFont('Marker felt');
        textSize(25);
        text('CLICK ANY KEY TO START', width / 3.45, height / 1.85);
        textSize(18);
        text('This is a multiplayer game!', width / 2.9, height / 1.5);
        textSize(15);
        text('For Monkey: use "W" and "S"', width / 2.85, height / 1.3);
        text('For Bear: use Up and Down Arrow', width / 3.05, height / 1.25);

        splashScreen();       
    }
}


function keyPressed() {
    monkey.setDirection();
    bear.setDirection(); 
    if (stage === 0) { //this checks if the game i in its initial state '0', if it is it changes its stage variable to 1
        stage = 1; //changing this stage triggers changes in the game state 
      }

// Resets the game when either player wins and the spacebar is pressed
if (key === ' ') { // Check if spacebar is pressed
    if (monkeyScore >= 5 || bearScore >= 5) {
        // Resets scores
        monkeyScore = 0;
        bearScore = 0;

        // Resets player and ball positions
        monkey.reset();
        bear.reset();
        ball.reset();

        // Resets original text position
        textSize(20);
        fill(222, 49, 99);
        textFont('Courier');

        // Resets the position of the score count text for the monkey
        text("MONKEY: " + monkeyScore, 20, 30);

        // Resets the position of the score count text for the bear
        text("BEAR: " + bearScore, 545, 30);

        // Resumes the draw loop
        loop();
    } else {
        // Moves players
        monkey.setDirection();
        bear.setDirection();
        }
    }
}

function splashScreen() {
  }

class Monkey {
    constructor(monkeySprite, startAcross, startDown, monkeySize, monkeySpeed, tileSize, tileRules) {
    // Attach the monkey sprite to the class instance
        this.sprite = monkeySprite;

    // Store the starting tile coordinates
        this.across = startAcross;
        this.down = startDown;
        
    // Convert tile coordinates to pixel coordinates    
        this.xPos = this.across * tileSize;
        this.yPos = this.down * tileSize;

    // Store the size and speed of the monkey
        this.size = monkeySize;
        this.speed = monkeySpeed;

    // Store tile rules for collisions    
        this.tileRules = tileRules;
        this.tileSize = tileSize;

    // Direction of movement (initialized as 0)
        this.dirX = 0;
        this.dirY = 0;
        
    // Flag indicating if the monkey is currently moving    
        this.isMoving = false;
        
    // Target position (initialized to the current position)    
        this.tx = this.xPos; 
        this.ty = this.yPos;

    //Variable that tracks the collision w the ball
    this.hasCollided = false;  
    }
    
checkCollisionWithBall(ball) {
    // Check collision with ball
    if (!this.hasCollided &&
        this.xPos - ball.size <= ball.xPos + ball.size && 
        this.xPos + this.size + ball.size >= ball.xPos && 
        this.yPos - ball.size <= ball.yPos + ball.size && 
        this.yPos + this.size + ball.size >= ball.yPos) { 
        
        // Reverse horizontal direction of the ball
        ball.dirX *= -1;
        // Randomly change vertical direction of the ball
        ball.dirY = random([-1, 1]);
        // Set collision flag to true
        this.hasCollided = true;
    }
    }

updatePosition() {
}

setDirection() {
    // If the "W" key is pressed and the monkey is not already moving
    if (keyIsDown(87) && !monkey.isMoving) {
        // Calculate the target position by subtracting the monkey's speed from its current y position
        let target = monkey.yPos - monkey.speed;
        // Check if the target tile index is within the playable area
        let targetTile = Math.floor(target / this.tileSize)
        if (targetTile >= 1 &&
            targetTile < 9) {
                // Update the monkey's y position to the target position
                monkey.yPos = target;
            } 
    }    
    if (keyIsDown(83) && !monkey.isMoving) {
        let target = monkey.yPos + monkey.speed;
        let targetTile = Math.floor(target / this.tileSize)
        if (targetTile >= 1 &&
            targetTile < 9) {
                monkey.yPos = target;
            } 
    }
}


checkTargetTile() {
//Determines the current tile coordinates based on the monkey's position    
    this.across = Math.floor(this.xPos / this.tileSize);
    this.down = Math.floor(this.yPos / this.tileSize);

//Calculates the coordinates of the target tile based on the intended direction     
    let nextTileHorizontal = this.across + this.dirX;
    let nextTileVertical = this.down + this.dirY;

//Checking if the target tile is within the boundaries of the map
    if (
        nextTileHorizontal >= 0 && //top of map
        nextTileHorizontal < numAcross && //bottom of map
        nextTileVertical >= 0 && //left edge of map
        nextTileVertical < numDown //right edge of map
    ) {

//Check if the target tile is walkable, ie, not blocked (tileRules value isn't 1)        
    if (this.tileRules[nextTileVertical][nextTileHorizontal] != 1) { // remember we have to swap these!
        //Calculate the precide x and y coordinates of the target tile
        this.tx = nextTileHorizontal * this.tileSize;
        this.ty = nextTileVertical * this.tileSize;
        
        //Set the flag to indicate that the monkey is ready to move to the target tile
        this.isMoving = true;
        }
    }
}

move() { 
    //The draw loop method that executres every frame
    
    //Check if the player is currently in motion
    if (this.isMoving) {
        //this code block will only activate when this.isMoving = true. Otherwise, nothing happens.
       
        //Move the player in the direction set by setDirection()
        this.xPos += this.speed * this.dirX;
        this.yPos += this.speed * this.dirY;

        //Check if the player has reached the target position
        if (this.xPos === this.tx && this.yPos === this.ty) {
            //If the player is at the target position, stop moving and reset variables
            this.dirX = 0;
            this.dirY = 0;
        }
    }
}


display() {
    imageMode(CORNER);
    image(this.sprite, this.xPos, this.yPos, this.size, this.size);
        }
    }

class Bear {
    constructor(bearSprite, startAcross, startDown, bearSize, bearSpeed, tileSize, tileRules) {
        //Attach sprite to key in object
        this.sprite = bearSprite;

        //Store starting tile info. Later, we will use these to store the current tile the bear is on.
        this.across = startAcross;
        this.down = startDown;
        
        //Convert tile coordinates into pixel coordinates
        this.xPos = this.across * tileSize;
        this.yPos = this.down * tileSize;

        //Store size and speed
        this.size = bearSize;
        this.speed = bearSpeed;

        //Check rules/collisions for the tile the bear wants to move to (target Tile)
        this.tileRules = tileRules;
        this.tileSize = tileSize;

        // Extra properties used to control bear movement
        // Set the initial direction to zero (not moving)
        this.dirX = 0;
        this.dirY = 0;
        
        //Check if the bear is currently moving to another tile
        this.isMoving = false;
        
        //The x/y position of the tile the bear is moving to (the target)
        this.tx = this.xPos; //Set these to the initial bear position
      
        this.ty = this.yPos;

        this.hasCollided = false; // Variable to track collision with the ball
    }

updatePosition() {
//this.down = Math.floor(this.yPos / this.tileSize)
    }

checkCollisionWithBall(ball) {
    // Check collision with ball
    if (!this.hasCollided &&
        this.xPos - ball.size <= ball.xPos + ball.size && 
        this.xPos + this.size + ball.size >= ball.xPos && 
        this.yPos - ball.size <= ball.yPos + ball.size && 
        this.yPos + this.size + ball.size >= ball.yPos) { 
    // Reverse horizontal direction of the ball
    ball.dirX *= -1;
    // Randomly change vertical direction of the ball
    ball.dirY = random([-1, 1]);
    // Set collision flag to true
    this.hasCollided = true;
    }
}


setDirection() {
    if (keyIsDown(UP_ARROW) && !bear.isMoving) {
        let target = bear.yPos - bear.speed;
        let targetTile = Math.floor(target / this.tileSize)
        if (targetTile >= 1 &&
            targetTile < 9) {
                bear.yPos = target;
            } 
    }    
    if (keyIsDown(DOWN_ARROW) && !bear.isMoving) {
        let target = bear.yPos + bear.speed;
        let targetTile = Math.floor(target / this.tileSize)
        if (targetTile >= 1 &&
            targetTile < 9) {
                bear.yPos = target;
            } 
    }
}

//This checks what tile the player wants to move to and if
//The player is allowed to move there
    checkTargetTile() {
    //First, get what tile the player is currently on
        this.across = Math.floor(this.xPos / this.tileSize);
        this.down = Math.floor(this.yPos / this.tileSize);

//Calculate the coordinates of the target tile
        let nextTileHorizontal = this.across + this.dirX;
        let nextTileVertical = this.down + this.dirY;
        console.log(nextTileVertical);

//Check is that tile is in bounds of the map
// Remember: && means AND (i.e. below is asking if ALL conditions are true)
    if (
        nextTileVertical >= 2 && //Left edge of map
        nextTileVertical < 9 //Right edge of map
        ) 
    {
    
//If it is in bounds, have we set it as moveable in our ruleMap:
    if (this.tileRules[nextTileVertical][nextTileHorizontal] != 1) { // remember we have to swap these!
        console.log("can move here triggered")
        //if the target tile is walkable, then...
        //...calculate the precise x and y coordinate of the target tile...
        this.ty = nextTileVertical * this.tileSize;
        
        //Because the player is ready to move there, we can set isMoving to true!
        this.isMoving = true;
        }
    }
}


move() {
    //This is in our draw loop, so called move() is called every frame BUT...
    if (this.isMoving) {
        //This code block will only activate when this.isMoving = true. Otherwise, nothing happens.
        //So first, start by moving in direction set by setDirection()
        this.xPos += this.speed * this.dirX;
        this.yPos += this.speed * this.dirY;

        //Now check if player has reached targetX
        if (this.xPos === this.tx && this.yPos === this.ty) {
            //If there, stop moving and reset our variables
            this.isMoving = false;
            this.dirX = 0;
            this.dirY = 0;
            }
        }
    }

display() {
    imageMode(CORNER);
    image(this.sprite, this.xPos, this.yPos, this.size, this.size);
    }

}
  
class Ball {
    constructor(ballSprite, ballSize, ballSpeed, tileSize, tileRules) {
        //Initialize ball properties
        this.sprite = ballSprite; 
        this.size = ballSize;
        this.speed = ballSpeed;
        this.tileRules = tileRules;
        this.tileSize = tileSize;
        this.dirX = 0;
        this.dirY = 0;
        this.isMoving = false;
        this.tx = 0;
        this.ty = 0;
        this.xPos;
        this.yPos;
        this.collision
        
//Randomly position the ball on valid tiles    
    this.randomizePosition();
    }

//Randomly position the ball on valid tiles    
    randomizePosition(desiredAcross, desiredDown) {
        if (3 !== undefined && 5 !== undefined) {
            // Check if the desired tile coordinate is valid for ball placement
            if (this.tileRules[5][3] !== 1) {
                // Calculating pixel coordinates based on desired tile position
                this.xPos = 3 * this.tileSize;
                this.yPos = 5 * this.tileSize;
                return; // Exit the method
            }
        }
    
        // If desired coordinates are not valid or not provided, respawn on tile (5,3) when exiting on the right side
        if (this.xPos > width) {
            this.xPos = 5 * this.tileSize;
            this.yPos = 3 * this.tileSize;
            return; // Exit the method
        }
    
        // Flag to ensure a valid position is found
        let validPosition = false;
    
        // Keep looping until a valid position is found
        while (!validPosition) {
            this.across = floor(random(numAcross));
            this.down = floor(random(numDown));
    
            // Check if the selected tile is valid for ball placement
            if (this.tileRules[this.down][this.across] !== 1) {
                // Calculating pixel coordinates based on tile position
                this.xPos = this.across * this.tileSize;
                this.yPos = this.down * this.tileSize;
                validPosition = true;
            }
        }
    }
    

update() {
    // Move the ball
    this.xPos += this.speed * this.dirX;
    this.yPos += this.speed * this.dirY;

    // Check if ball goes beyond the first respawn boundary
    if (this.xPos < 50) { // checks if ball is off screen to the left
        this.xPos = 500;
        this.yPos = 300;
        bearScore++
    }

    // Check if ball goes beyond the second respawn boundary
    if (this.xPos > 545) { // checks if ball is offscreen to the right --> if it goes past the boundary of the width, then it 
        this.xPos = 100;
        this.yPos = 300;
        monkeyScore++

    }

    // Check if ball goes out of court on the right side
    if (this.yPos > height) {
        // Point to the right player


    // Reset collision flags when ball leaves player's area
    if (this.xPos < 0 || this.xPos > width) {
        monkey.hasCollided = false;
        bear.hasCollided = false;

        }
    }
}
    



setDirection() {
    if (!this.isMoving) {
        // Randomly select -1 or 1 for left or right movement
        let randomDirection = random([-1, 1]);

        // Always move horizontally
        this.dirX = randomDirection;
        this.dirY = 0;

        // Set target tile to the canvas boundaries
        this.tx = this.dirX === -1 ? 0 : width - this.size;

        // Start moving
        this.isMoving = true;
    }
}

checkTargetTile() {
    //Calculating the next tile coordinates based on the direction
    let nextTileHorizontal = this.across + this.dirX;
    let nextTileVertical = this.down + this.dirY;

    //Checking if the next tile is within the bounds of the tilemap
    if (
        nextTileHorizontal >= 0 &&
        nextTileHorizontal < numAcross &&
        nextTileVertical >= 0 &&
        nextTileVertical < numDown
    ) {
        //Checking if the next tile is valid (not an obstacle)
        if (this.tileRules[nextTileVertical][nextTileHorizontal] !== 1) {
            this.tx = nextTileHorizontal * this.tileSize;
            this.ty = nextTileVertical * this.tileSize;
            this.isMoving = true;
        }
    }
}

move() {
if (this.isMoving) {
    // Move the ball horizontally
    this.xPos += this.speed * this.dirX;

// Check for collisions with monkey and bear
if (this.xPos + this.size >= monkey.xPos && this.xPos <= monkey.xPos + monkey.size &&
        this.yPos + this.size >= monkey.yPos && this.yPos <= monkey.yPos + monkey.size) {
            this.collision = true;
        // Reverse horizontal direction
        this.dirX *= -1;
        // Randomly change vertical direction
        this.dirY = random([-1, 1]);
    } else {
        this.collision = false //temp for testing
    }

if (this.xPos + this.size >= bear.xPos && this.xPos <= bear.xPos + bear.size &&
    this.yPos + this.size >= bear.yPos && this.yPos <= bear.yPos + bear.size) {
        this.collision = true;
    // Reverse horizontal direction
    this.dirX *= -1;
    // Randomly change vertical direction
    this.dirY = random([-1, 1]);
}else {
    this.collision = false //temp for testing
}

    // Move the ball vertically
    this.yPos += this.speed * this.dirY;

// Check if the ball hits the canvas boundaries vertically
if (this.yPos <= 0 || this.yPos + this.size >= height) {
    // Reverse vertical direction
    this.dirY *= -1;
}

// Move to the target position if the ball is close enough
if (dist(this.xPos, this.yPos, this.tx, this.ty) < this.speed) {
    this.isMoving = false;
    this.xPos = this.tx;
    this.yPos = this.ty;
            }
        }
    }
    
    

display() {
    imageMode(CORNER);
    // displaying the sprite image 
    image(this.sprite, this.xPos, this.yPos, this.size, this.size);
    }
}
        

class Tile {
    constructor(texture, across, down, tileSize, tileID) {
        this.texture = texture;
        this.across = across;
        this.down = down;
        this.xPos = across * tileSize;
        this.yPos = down * tileSize;
        this.tileSize = tileSize; 
        this.tileID = tileID;
    }

display() {
    // Displays the texture of the instance of the Tile class
    noStroke();
    image(this.texture, this.xPos, this.yPos, this.tileSize, this.tileSize);
}

debug() {
    }
}