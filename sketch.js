var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running, mario_collided;
var ground, groundImage;


var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;
var jumpSound;

var gameOver, restart;

function preload(){
mario_running=loadAnimation("mario01.png","mario02.png","mario03.png");
  //mario_running=loadAnimation("collided.png");
   groundImage=loadImage("ground2.png");
  
   obstacle1=loadImage("obstacle1.png");
   obstacle2=loadImage("obstacle2.png");
   obstacle3=loadImage("obstacle3.png");
   obstacle4=loadImage("obstacle4.png");
  
   backgroundImage=loadImage("bg.png");
 
  
  brickImage=loadImage("brick.png");
  
  mario_collided =loadAnimation("collided.png");
  
  gameoverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
  jumpSound=loadSound("jump.mp3");
  
  
    
  }

function setup(){
  createCanvas(windowWidth, windowHeight);
  
 
  
  mario = createSprite(50,height-100,40,10);
  
  
  mario.addAnimation("running", mario_running);
  mario.addAnimation("collided", mario_collided);
  mario.setCollider('circle',0,0,15)
  //mario.debug=true;
  
  //bg = createSprite(400,200,width,height);
  //bg.addImage("bg",backgroundImage);
  //bg.scale=2.5;
   
  ground = createSprite(width,height+20,width,60);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -(6 + score/100);
  ground.scale=3.5;
  
  gameOver = createSprite(width/2,height/2- 135);
  gameOver.addImage(gameoverImage);
  
  restart = createSprite(width/2,height/2-100);
  restart.addImage(restartImage);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
 
  gameOver.visible = false;
  restart.visible = false;

  bricksGroup1 = new Group();
  bricksGroup2 =new Group();
   bricksGroup3 =new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
}

function draw(){
  
  background("lightblue");
  textSize(15);
  fill("black")
  text("SCORE: "+ score,50,height-250);
  
  
  if (gameState===PLAY){
    
    spawnBricks1();
    spawnBricks2();
      spawnBricks3()

    spawnObstacles();
    
      if(bricksGroup1.isTouching(mario)){
      bricksGroup1.destroyEach();
      
      score=score+1;
    }
       if(bricksGroup2.isTouching(mario)){
      bricksGroup2.destroyEach();
      
      score=score+1;
    }
    if(bricksGroup3.isTouching(mario)){
      bricksGroup3.destroyEach();
      
      score=score+1;
    }
    
    
    //score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + score/30);
    
    if((touches.length > 0 || keyDown("SPACE")) && mario.y  >= height-150) {
      jumpSound.play( )
      mario.velocityY = -10;
       touches = [];
    }
    
    mario.velocityY = mario.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    mario.collide(ground);
    
  
    if(obstaclesGroup.isTouching(mario)){
        //collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    mario.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bricksGroup1.setVelocityXEach(0);
    bricksGroup2.setVelocityXEach(0);
     bricksGroup3.setVelocityXEach(0);
    //change the trex animation
    mario.changeAnimation("collided",mario_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bricksGroup1.setLifetimeEach(-1);
     bricksGroup2.setLifetimeEach(-1);
     bricksGroup3.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }
  
  
  drawSprites();
  
  fill("black")
  text("HIT THE BRICKS TO SCORE POINTS" , 50 , height-230);
}




function spawnBricks1() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var brick = createSprite(width-50,height-100,40,10); 
    brick.y = Math.round(random(height-150,height-200));
    brick.addImage(brickImage);
    
    brick.scale = 0.5;
    brick.velocityX = -6;
    
     //assign lifetime to the variable
    brick.lifetime = 300;
    
    //adjust the depth
    brick.depth = mario.depth;
    mario.depth = mario.depth+1;
    
    //add each cloud to the group
    bricksGroup1.add(brick);
  }
  
}
function spawnBricks2() {
  //write code here to spawn the clouds
  if (frameCount % 115 === 0) {
    var brick = createSprite(width-50,height-100,40,10); 
    brick.y = Math.round(random(height-150,height-200));
    brick.addImage(brickImage);
    
    brick.scale = 0.5;
    brick.velocityX = -6;
    
     //assign lifetime to the variable
    brick.lifetime = 300;
    
    //adjust the depth
    brick.depth = mario.depth;
    mario.depth = mario.depth+1;
    
    //add each cloud to the group
    bricksGroup2.add(brick);
  }
  
}
function spawnBricks3() {
  //write code here to spawn the clouds
  if (frameCount % 135 === 0) {
    var brick = createSprite(width-50,height-100,40,10); 
    brick.y = Math.round(random(height-150,height-200));
    brick.addImage(brickImage);
    
    brick.scale = 0.5;
    brick.velocityX = -6;
    
     //assign lifetime to the variable
    brick.lifetime = 300;
    
    //adjust the depth
    brick.depth = mario.depth;
    mario.depth = mario.depth+1;
    
    //add each cloud to the group
    bricksGroup3.add(brick);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(width-50,height-130,20,30);
    obstacle.setCollider('circle',0,0,15)
    //obstacle.debug=true;
  
  
    obstacle.velocityX = -(6 + score/50);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.7;
    obstacle.lifetime = 300;
    obstacle.depth = mario.depth;
    mario.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bricksGroup1.destroyEach();
  bricksGroup2.destroyEach();
  bricksGroup3.destroyEach();
  
  mario.changeAnimation("running",mario_running);
  
  score = 0;
  
}
