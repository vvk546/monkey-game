var play = 1;
var end = 0;
var gameState = play;

var monkey , monkey_running,invisibleGround,ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 200);
  monkey = createSprite(50,185,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
   invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false;
   obstacleGroup = createGroup();
  foodGroup = createGroup();
  ground=createSprite(300,185,600,10);
}


function draw() {
  background('lightblue');
 
  text("Score: "+ score, 500,50);
  
  if(gameState === play){
   score = score + Math.round(getFrameRate()/60);
    if(keyDown("space")&& monkey.collide(ground)) {
        monkey.velocityY = -14;
    }
    monkey.velocityY = monkey.velocityY + 1;
    obstacles();
    food();
    if(obstacleGroup.isTouching(monkey)){
        gameState =end;
    }
    if(foodGroup.isTouching(monkey)){
      score=score+5;
     
      
    }
  }
   drawSprites();

      if (gameState === end) {
       obstacleGroup.setLifetimeEach(-1);
       foodGroup.setLifetimeEach(-1);
       obstacleGroup.setVelocityXEach(0);
       foodGroup.setVelocityXEach(0);
       monkey.destroy();
       score=0;
       textSize(20);
       text("game over",270,100)
     }
  monkey.collide(invisibleGround);
}
 function obstacles(){
   if (frameCount % 60 === 0){
   obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.1; 
   obstacleGroup.add(obstacle);
   }
 }
function food(){
  if(frameCount%60===0){
    banana=createSprite(600,120,10,40);
    banana.velocityX = -(6 + score/100);
   
   banana.addImage(bananaImage);
   banana.scale=0.1; 
   foodGroup.add(banana);
  }
}

   
   
   
 


  






