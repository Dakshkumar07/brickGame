var backgroundImage
var ball,ballImage
var start, startImage
var man,manImage
var edge
var bricks, bricksImage
var brickGroup
var restart,restartImage
var live =3
var score =0
var gamestate = "serve"
function preload(){
  backgroundImage = loadImage("images/background3.png")
  ballImage = loadImage("images/ball.png")
  startImage = loadImage("images/start.png")
  manImage = loadImage("images/man.png")
  restartImage = loadImage("images/restart image.png")
  bricksImage = loadImage("images/b.jpg")



}

function setup(){
   createCanvas(windowWidth,windowHeight)

    ball = createSprite(width/2,height-350)
    ball.addImage(ballImage);
    ball.scale =0.1

    start = createSprite(width/2,height-70)
    start.addImage(startImage)
    start.scale =0.5
 
   restart = createSprite(width/2,height-70)
   restart.addImage(restartImage)
   restart.scale =0.5
   restart.visible =false

    man = createSprite(width/2,height-200,200)
    man.addImage(manImage)
    man.scale =0.5

    brickGroup = createGroup(); 
    bricks()
   }
    


function draw(){
   background(backgroundImage)
text(mouseX + "," + mouseY,mouseX,mouseY)

if(gamestate === "serve"){
start.visible = true
if(mousePressedOver(start)){
gamestate = "play"
ball.velocityX =-9
ball.velocityY =8



}
}


if(gamestate === "play"){   
start.visible = false
restart.visible = false
man.x = mouseX;
ball.bounceOff(man)
edge = createEdgeSprites()
ball.bounceOff(edge[0])
ball.bounceOff(edge[1])
ball.bounceOff(edge[2])

for(var i=0 ; i<brickGroup.length; i++){
    if(ball.isTouching(brickGroup.get(i))){
        brickGroup.get(i).destroy();
        ball.velocityY =-ball.velocityY
        score =score+20
        }

}
if(ball.isTouching(edge[3])){
live =live-1
ball.x =width/2
ball.y =height/2

if(live===0){
gamestate ="end"
}
}




}

else if(gamestate==="end"){
reset();

}









    drawSprites();
    textSize(25)
   
    text("Score :"+score,windowWidth-550,50)
    text("Lives :"+live,12,25)

}
function bricks(){
 for (var x =50 ; x < windowWidth ; x = x+windowWidth/15){
    for(var y =100 ; y <460 ; y =y+50){
bricks = createSprite(x,y)
bricks.scale =0.2
bricks.addImage("bricksImage",bricksImage)
brickGroup.add(bricks)
    }
 
}

 }
 
 function reset(){
restart.visible =true
if(mousePressedOver(restart)){
gamestate ="play"
ball.x =width/2
ball.y =height-350
ball.velocityX =-9
ball.velocityY =8

score=0
live=3

}


 }


