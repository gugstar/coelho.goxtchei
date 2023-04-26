const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine
let world
var chao
var fundo
var rope,rop,ro
var fruta
var fruta_con,fruta_conn,fruta_connn
var coelho, coelho_img
var botao1,botao2,botao3
var sound
var musica
var pm
var pisca, come, triste
var come_som
var triste_som
var isPlaying = false
var balao
var ar_som
var canw   
var canh 



function preload(){
fundo = loadImage ("assets/background.png")
coelho_img = loadImage ("assets/eat_0.png")
musica = loadSound ("assets/sound1.mp3")
pisca = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png")
come = loadAnimation("assets/eat_0.png","assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png")
triste = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png")
come_som = loadSound("assets/eating_sound.mp3")
triste_som = loadSound("assets/sad.wav")
ar_som = loadSound("assets/air.wav")
rope_som = loadSound("assets/rope_cut.mp3")

come.looping = false
triste.looping = false
}

function setup() {

var isMobile = /iPhone|Ipad|iPod|Android/i.test(navigator.userAgent)

if(isMobile){
  canw = displayWidth
  canh = displayHeight
  createCanvas(canw,canh);
}else{
  var canw = windowWidth  
  var canh = windowHeight
  createCanvas(canw,canh);
}

  
  engine = Engine.create();
  world = engine.world;

chao = new Ground(width/2,height-10,width,20)
rope = new Rope(6,{x:200,y:30})
rop = new Rope(7,{x:320,y:30})
ro = new Rope(4,{x:80,y:30})
fruta = new Fruta()
Composite.add(rope,fruta)
fruta_con = new Link (rope,fruta.body)
fruta_conn = new Link (rop,fruta.body)
fruta_connn = new Link (ro,fruta.body)


 triste.frameDelay = 30
 come.frameDelay = 10
 pisca.frameDelay = 30

 coelho = createSprite(351,canh-80)
 coelho.addAnimation("piscando", pisca)
 coelho.addAnimation("comendo", come)
 coelho.addAnimation("triste", triste)
 coelho.setCollider("rectangle",0,0,300,600)
 coelho.scale = 0.2

 botao1 = createImg("assets/cut_btn.png")
 botao1.position(290,30)
 botao1.size(50,50)
 botao1.mouseClicked(dropp)

 botao2 = createImg("assets/cut_btn.png")
 botao2.position(170,30)
 botao2.size(50,50)
 botao2.mouseClicked(drop)

 botao3 = createImg("assets/cut_btn.png")
 botao3.position(50,30)
 botao3.size(50,50)
 botao3.mouseClicked(droppp)

 sound = createImg("assets/mute.png")
 sound.position(440,20)
 sound.size(50,50)
 sound.mouseClicked(pm)

 balao = createImg("assets/balloon.png")
 balao.position(427,160)
 balao.size(70,50)
 balao.mouseClicked(ar)

 //musica.play()


imageMode (CENTER)
rectMode (CENTER)
ellipseMode (CENTER)
}

function draw() {
  background(51);
  image(fundo,width/2,height/2,width,height)
  Engine.update(engine);

  text(mouseX+","+mouseY,20,20)

  chao.show()
  rope.show()
  rop.show()
  ro.show()
  if(fruta!==null){
    fruta.show()    
  }
  


  drawSprites();


  if(colisao(fruta,coelho,80)==true){
    World.remove(world,fruta.body)
    fruta = null
    coelho.changeAnimation("comendo")
    come_som.play();
  }

  if(colisao(fruta,chao.body,200)==true){
    coelho.changeAnimation("triste")
    if(triste_som.isPlaying()==false){
      triste_som.play()
      triste_som.setVolume(0.2)
    }
    

  }
  
}

function drop(){
  rope.break()
  fruta_con.cut()
  rope_som.play()

}
function dropp(){
  rop.break()
  fruta_conn.cut()
  rope_som.play()
}
function droppp(){
  ro.break()
  fruta_connn.cut()
  rope_som.play()
}

function pm(){

if (musica.isPlaying()){
  musica.stop()
  sound.style("filter","hue-rotate(0 yiuj)") 
}else{
  musica.play()
  musica.setVolume(0.3)
  sound.style("filter","hue-rotate(120deg)")
}



 
}


function colisao(body,sprite,c){
 if(fruta !== null){
   var d = dist(body.body.position.x, body.body.position.y, sprite.position.x, sprite.position.y)

   if(d < c){
    return true
   }else{
    return false
   }

 }
}

function ar(){
 ar_som.play()
 Body.applyForce(fruta.body,{x:0,y:0},{x:-0.01,y:0}) 
}

