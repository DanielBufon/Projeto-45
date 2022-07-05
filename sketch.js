var bg,bgImg;
var player, shooterImg, shooter_shooting, municaoImg;
var borda
var zombieImage
var zombieGroup
var tiroGroup
var pontos = 0
var coracao1, coracao2 ,coracao3
var coracao
var vidas = 3
var gameState = "jogando"
var perdeu 

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImage = loadImage ("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  coracao1 = loadImage ("assets/heart_1.png")
  coracao2 = loadImage ("assets/heart_2.png")
  coracao3 = loadImage ("assets/heart_3.png")
  municaoImg = loadImage ("assets/bala.png")
  perdeu = loadSound ("assets/explosion.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
 
coracao = createSprite (200,50,20,20)
coracao.addImage ("3", coracao3)
coracao.addImage ("2", coracao2)
coracao.addImage ("1", coracao1)
coracao.scale = 0.3
//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

 borda = createEdgeSprites()

 zombieGroup = new Group()
 tiroGroup = new Group()
}

function draw() {
  background(bgImg); 

  fill ("white")
  textSize (30)
  text ("pontos: " + pontos, 1000, 50)
  
player.collide(borda)

if(gameState == "jogando"){
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }
    if (keyDown("LEFT_ARROW")||touches.length>0){
      player.x = player.x -30
    }
    if (keyDown ("RIGHT_ARROW")||touches.length>0){
      player.x = player.x+30
      
    }
    if(keyWentDown("space")){
 
      player.addImage(shooter_shooting)
      atirar()
    }
    
    //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
    else if(keyWentUp("space")){
      player.addImage(shooterImg)
    }
    tiroGroup.isTouching (zombieGroup,collision)
    player.isTouching (zombieGroup,collisionPlayer)
    spawnarzombie();
    zombieGroup.isTouching(borda[0],collisionPlayer)
    
  }

else if (gameState == "fim"){
  fill("red")
  textSize(60)
  text ("GameOver", windowWidth/2, windowHeight/2 )
}
drawSprites();
}
function spawnarzombie(){
  if (frameCount %60 == 0){
    var x = Math.round(random(windowWidth/2 + 100,windowWidth))
    var y = Math.round(random(50, windowHeight - 50))
    var zombie = createSprite(x,y)
    zombie.addImage (zombieImage)
    zombie.scale = 0.13
    zombie.velocityX = -(2+ pontos)
    zombieGroup.add (zombie)
    zombie.lifetime = 500
    }
}

function atirar(){ 
  var tiro = createSprite (player.x + 55, player.y - 25, 20,20)
  tiro.addImage (municaoImg)
  tiro.scale = 0.08
  tiro.velocityX = 15
  tiroGroup.add(tiro);
  

  tiro.lifetime = 100
}
function collision(tiro,zombie){
  tiro.destroy()
  zombie.destroy()
  pontos += 1
}
function collisionPlayer(player,zombie){
  zombie.destroy()
  if (vidas == 3){
coracao.changeImage("2")
setTimeout(() => {
  vidas-= 1
}, 1000);
  }
  if (vidas == 2){
coracao.changeImage ("1")
setTimeout(() => {
  vidas-= 1
}, 1000);
  }
  if (vidas == 1){
gameState = "fim"
perdeu.play()
coracao.visible = false
  }
}