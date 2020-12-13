var PLAY=1;
var END=0;
var gameState=PLAY;
var background,spaceImage;
var asteroids,asteroids1,asteroidsImage,asteroidsImage1,asteroidsGroup;
var rocket,rocketImage,rocketImage1,rocketImage2,
rocketImage3;
var stars,starsImage,starsGroup;

var gameOverImage, winImage;

var restart,restartImage;

var survivalTime;
var points;
var safeZone,safeZoneImage;



function preload(){
spaceImage=loadImage("space.png");
rocketImage=loadImage("rocket.png");
rocketImage1=loadImage("rocket1.png")
rocketImage2=loadImage("rocket2.png")
rocketImage3=loadImage("rocket3.png")
asteroidsImage=loadImage("asteroids.png") ;
asteroidsImage1=loadImage("asteroids1.png") ;
starsImage=loadImage("star.png")  ;  
  
 gameOverImage=loadImage("gameOver1.png") 
  winImage=loadImage("winImage.png")
  restartImage=loadImage("restart.png")
  safeZoneImage=loadImage("safezone.png")

}

function setup() {
  createCanvas(600,600);
  
background=createSprite (300,355,600,600);
background.addImage(spaceImage);
background.scale=2
background.velocityY=-2;
  
 rocket=createSprite(550,550,30,30);
 rocket.addImage(rocketImage);
  rocket.scale=0.1;
  
  safeZone=createSprite(90,40,80,40);
  safeZone.addImage(safeZoneImage)
  safeZone.scale=0.35
 restart=createSprite(300,500,40,40) 
  restart.addImage(restartImage);
  restart.scale=0.2
  
  
  
  
  
  survivalTime=0;
  points=0;
  asteroidsGroup= createGroup();
  starsGroup=createGroup();
}

function draw() {
  
// moving background 
if(background.y<240){
  background.y=300;
}
 
  //movement of rocket with the help of keys
 if(keyDown("up_arrow")){
   rocket.y=rocket.y-2;
   rocket.addImage(rocketImage);
}
  
  if(keyDown("down_arrow")){
   rocket.y=rocket.y+2; 
  rocket.addImage(rocketImage3);
}
  
  if(keyDown("left_arrow")){
   rocket.x=rocket.x-2; 
rocket.addImage(rocketImage1);
 }
  
  if(keyDown("right_arrow")){
   rocket.x=rocket.x+2; 
    rocket.addImage(rocketImage2); 
  }
  
  
  if(gameState===PLAY){
    
    survivalTime =survivalTime + Math.round(getFrameRate()/60);
    
  if (starsGroup.isTouching(rocket))  {
    points=points+1;
    starsGroup.destroyEach();
}
    
    restart.visible=false;
  
   
  }
  
  
if (asteroidsGroup.isTouching(rocket)) {
 gameState=END; 
  
  } 
  
  
  if (gameState===END){
    
  
  
  starsGroup.destroyEach();
    starsGroup.visible=false;
  asteroidsGroup.destroyEach();
  asteroidsGroup.visible=false;
    
  safeZone.visible=false;  
    
    rocket.visible=false
  
   background.addImage(gameOverImage)
    background.scale=3
    background.velocityY=0;
   
    restart.visible=true;
    
  }
  
  
  
    
  if(rocket.isTouching(safeZone)){
    
    
    gameState=END;
     background.addImage(winImage)
    background.scale=1.8
    
    
  }
  
  
  
    
    
   //safeZone.debug=true; 
 safeZone.setCollider("rectangle", 0, 0, 430, 87);
   // rocket.debug=true;
    rocket.setCollider("circle",0,0,450)
   asteroidsGroup.setColliderEach("rectangle", 0, 0, 20, 80,-45);
  starsGroup.setColliderEach("rectangle", 0, 0, 20, 80,-45);
  
  asteroids();             
  asteroids1();
  stars();
  
  
  
  
  
  
  if(mousePressedOver(restart)) {
      reset();
    }    
 drawSprites();
  
   textSize(20);
  fill("red");
  text("SURVIVAL TIME :",360,70);
  text(survivalTime,550,70)
  
  text("POINTS :"+points,360,90);
}




function stars(){
  
  if (World.frameCount%60===0){
    
  var stars=createSprite(60,50,10,10) ; 
  stars.addImage(starsImage) ;
  stars.scale=0.25;
 stars.x=Math.round(random(50,550)) 
   stars.velocityY=2; 
    stars.setLifeTime=550;
   starsGroup.add(stars) ;
 }
  
  
  
  
  
  
}


function asteroids(){
  
  if(World.frameCount%50===0){
    
    var asteroids=createSprite(50,200,30,30) ;
    asteroids.addImage(asteroidsImage);
    asteroids.scale=0.23;
    asteroids.y=Math.round(random(50,600))
   asteroids.velocityX=2;
    asteroids.setLifeTime=550;
    asteroidsGroup.add(asteroids);
    
  }
}


 function asteroids1(){
  
if(World.frameCount%50===0){
       
  
  var asteroids1=createSprite(300,30,30,30)  ;  
  asteroids1.addImage(asteroidsImage1) ;
  asteroids1.scale=0.23;
  asteroids1.x=Math.round(random(30,500))  ; 
  asteroids1.velocityY=2;
  asteroids1.setLifeTime=550;
  asteroidsGroup.add(asteroids1);
}
}

function reset(){
  
  gameState=PLAY;
  
  restart.visible=false;
  starsGroup.destroyEach();
 asteroidsGroup.destroyEach();
points=0;
  survivalTime=0;
    background.addImage(spaceImage)
  background.velocityY=-2;
  
  rocket.visible=true
  rocket.x=550;
  rocket.y=550;
  
  safeZone.visible=true
}






