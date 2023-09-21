//var path;
var oggy;
var joey,marky,deedee;
var jack;
var olivia;
var bob;
var attack;

//var pathImg;
var oggyImg;
var oggyWalkingAnimation;
var joeyImg,markyImg,deedeeImg;
var jackImg;
var oliviaImg;
var bobImg;

var joeyCG,markyCG,deedeeCG;
var jackCG;
var oliviaCG;
var bobCG;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var kills = 0;
var gameOver,restart;

function preload() {

  bg=loadImage("IMAGES/backgroundtile.jpg");

  oggyIdle=loadAnimation("IMAGES/OGGY IDLE/1.png","IMAGES/OGGY IDLE/2.png","IMAGES/OGGY IDLE/3.png","IMAGES/OGGY IDLE/4.png","IMAGES/OGGY IDLE/5.png","IMAGES/OGGY IDLE/6.png","IMAGES/OGGY IDLE/7.png")
  
  oggyWalkingAnimation=loadAnimation( "IMAGES/OGGY WALKING/1.png","IMAGES/OGGY WALKING/2.png","IMAGES/OGGY WALKING/3.png","IMAGES/OGGY WALKING/4.png","IMAGES/OGGY WALKING/5.png","IMAGES/OGGY WALKING/6.png","IMAGES/OGGY WALKING/7.png","IMAGES/OGGY WALKING/8.png");
  
  oggyIdleWithASwatter=loadAnimation("IMAGES/OGGY IDLE WITH A SWATTER/1.png");
  
  oggyWalkingWithASwatter=loadAnimation("IMAGES/OGGY WALKING WITH A SWATTER/1.png","IMAGES/OGGY WALKING WITH A SWATTER/2.png","IMAGES/OGGY WALKING WITH A SWATTER/3.png","IMAGES/OGGY WALKING WITH A SWATTER/4.png","IMAGES/OGGY WALKING WITH A SWATTER/5.png","IMAGES/OGGY WALKING WITH A SWATTER/6.png");
  
  oggySwatting=loadAnimation("IMAGES/OGGY SWATTING/1.png","IMAGES/OGGY SWATTING/2.png","IMAGES/OGGY SWATTING/3.png","IMAGES/OGGY SWATTING/4.png");
  
  oggyJumping=loadAnimation("IMAGES/OGGY JUMPING/1.png","IMAGES/OGGY JUMPING/2.png","IMAGES/OGGY JUMPING/3.png",);
  
  oggyDeath=loadAnimation("IMAGES/OGGY DEATH/DEATH.png");
  
  joeyImg=loadImage("IMAGES/COCKROACHES/JOEY.png");
  
  markyImg=loadImage("IMAGES/COCKROACHES/MARKY.png");

  deedeeImg=loadImage("IMAGES/COCKROACHES/DEE DEE.png");

  jackImg=loadImage("IMAGES/OBSTACLES/JACK.png");
 
  oliviaImg=loadImage("IMAGES/OBSTACLES/OLIVIA.png");
 
  //bobImg=loadImage("IMAGES/OBSTACLES/BOB.png");

  }

  function setup() {
  createCanvas(700,700);
   
  path = createSprite(500,350);
  
  //path.addImage(pathImg);
  
  path.velocityY = -5;
    
   grassBg=createSprite(width/2,height/2);
  
   grassBg.addImage("grass",bg);
  
   grassBg.scale=0.5208             //screen wisth divided by image width
  
   grassBg.y=-806*grassBg.scale;

   oggy = createSprite(0,700);
  
   oggy.addAnimation("walking",oggyWalkingAnimation);
  
   oggy.scale = 1;

   //oggy.setCollider();

     attack=0;

   gameOver = createSprite();
  
   // gameOver.addImage();
  
   gameOver.scale = 0.8;
  
   gameOver.visible = false;

   joeyCG = new Group();
  
   markyCG = new Group();
  
   deedeeCG = new Group();
  
   jackCG = new Group();
  
   oliviaCG = new Group();
  
   bobCG = new Group();

  }


function draw() {

  background(0);  
  
  drawSprites();

  textSize(20);

  fill(255);
  
  text("Kills="+kills,200,50);
   
   //console.log(grassBg.y)
  
 
  if(gameState===PLAY){
    
   // kills = kills + Math.round(getFrameRate()/50);
  
   path.velocityY = -(6 + 2*kills/150);

    grassBg.velocityY=3
  
    //background scroll logic
  
    if(grassBg.y>2070*grassBg.scale){
  
      grassBg.y=-806*grassBg.scale
  
    }
  
    oggy.x = World.mouseX;
   
    if(oggy.x<350){
  
      oggy.mirrorX(-1);
  
    }
  
    else if(oggy.x>350){
  
      oggy.mirrorX(1);
  
    }

    edges = createEdgeSprites();
  
    oggy.collide(edges);
   
    if(path.y < 0 ){
  
      path.y = height/2;
  
    }

  }

   if(keyDown("SPACE")){
  
    attack=1;
  
  }

   else{
  
    attack=0;
  
  }
  
  if(oggy.isTouching(joeyCG)){
  
    if(attack===1){
  
      kills=kills+1;
  
      //addanimation
  
    }
  
    if(attack===0){
  
      //addanimation
  
      gameState=END;
  
      text("GAME OVER",350,350);

    }
  
  }

   spwanCockroaches();
   
   spwanObstacles();

}

function spwanCockroaches(){

  if(frameCount%100===0){
    
    var randomvar=Math.round(random(1,3));
    
    if(randomvar===1){
      
      var joey=createSprite(100,0);
      
      //joey.shapeColor="pink";
      
      joey.addImage(joeyImg);
      
      joey.velocityY=10;
      
      joey.lifetime=70;
      
      joeyCG.add(joey);
      
      joey.scale=1;

    }
    
    if(randomvar===2){
      
      var marky=createSprite(350,0);
      
      //marky.shapeColor="grey";
      
      marky.addImage(markyImg);
      
      marky.velocityY=10;
      
      marky.lifetime=70;
      
      markyCG.add(marky);

      marky.scale=1;

    }

    if(randomvar===3){

      var deedee=createSprite(600,0);
      
      //deedee.shapeColor="blue";
      
      deedee.addImage(deedeeImg);

      deedee.velocityY=10;
      
      deedee.lifetime=70;
      
      deedeeCG.add(deedee);

      deedee.scale=1;

    }
  }
}

function spwanObstacles(){

  if(frameCount%100===0){
    
    var randomvar=Math.round(random(4,6));
    
    if(randomvar===4){
      
      var jack=createSprite(200,0);
      
      //joey.shapeColor="pink";
      
      jack.addImage(jackImg);
      
      jack.velocityY=10;
      
      jack.lifetime=70;
      
      jackCG.add(jack);

      jack.scale=1;

    }
    
    if(randomvar===5){
      
      var olivia=createSprite(450,0);
      
      //marky.shapeColor="grey";
      
      olivia.addImage(oliviaImg);
      
      olivia.velocityY=10;
      
      olivia.lifetime=70;
      
      oliviaCG.add(olivia);

      olivia.scale=1;

    }

    if(randomvar===6){

      var bob=createSprite(500,0);
      
      //deedee.shapeColor="blue";
      
      //bob.addImage(bobImg);

      bob.velocityY=10;
      
      bob.lifetime=70;
      
      bobCG.add(bob);

      bob.scale=1;

    }
  }
}