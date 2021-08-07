var balloon,balloonImage1;
var database;
var height

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("HotAirBallon01.png");
   balloonImage2=loadAnimation("HotAirBallon01.png"," HotAirBallon01.png",
   "HotAirBallon01.png","HotAirBallon02.png","HotAirBallon02.png",
   "HotAirBallon02.png","HotAirBallon03.png","HotAirBallon03.png","HotAirBallon03.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(1500,700);
  database=firebase.database();
  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.4;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);



  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.x=balloon.x-5
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.x=balloon.x+5
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.y=balloon.y-5
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.y=balloon.y+5
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x, y){
   database.ref('balloon/height').set({
     "x": height.x ,
     "y": height.y 
   })
 }

function readHeight(data){
  height = data.val();
   balloon.x = height.x;
   balloon.y = height.y;
 }


function showError(){
  console.log("Error in writing to the database");
}