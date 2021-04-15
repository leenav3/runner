var play=1;
var end=2;
var begin=0;
var gameState = begin;
var active_animal=null;

var caveman,caveman_running,cavemanImage;
var animal,bear1_running;
var bground,bgroundImage,invisibleGround;
var trap,trapImage,trapGroup;
var tree,treeImage,treeGroup;
var gameover,gameoverImage;
var fruitGroup;
var win,winImage;
var score = 0;
var honey,honeyBee,honeyBeeImg ,honeyImg;

function preload(){
  caveman_running = loadAnimation("images/caveman1.png","images/caveman2.png","images/caveman3.png","images/caveman4.png");
  cavemanImage = loadAnimation("images/caveman_jump.png");
  bear1_running = loadAnimation("images/bear1.png","images/bear2.png","images/bear3.png","images/bear4.png","images/bear5.png");
  bear1Image = loadAnimation("images/bear_jump.png");
  bearDie = loadAnimation("images/bearDie.png");
  bgroundImage = loadImage("images/bg.jpg");
  treeImage = loadImage("images/tree.png");
  monkeyRunning = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png");
  monkeyImage = loadAnimation("images/Monkey_04.png");
  trapAnimation = loadAnimation("images/trap_1.png","images/trap_2.png","images/trap_3.png","images/trap_4.png","images/trap_5.png");
  trapImage = loadImage("images/trap_1.png");
  bananaImage = loadImage("images/banana.png");
  cherryImage = loadImage("images/cherry.png");
  // gameoverImage = loadImage("gameover.png");
  // winImage = loadImage("youwin.png");
  fox_running = loadAnimation("images/fox.png","images/fox_2.png","images/fox_3.png","images/fox_4.png","images/fox_5.png","images/fox_6.png","images/fox_7.png");
  foxImage = loadAnimation("images/fox_2.png");
  honeyBeeImg = loadAnimation("images/bee1.png","images/bee2.png");
  honeyImg = loadImage("images/honey.png");
}

function setup(){
  createCanvas(600,500);
  
    bground = createSprite(300,200,1200,500);
    bground.addImage(bgroundImage);
    bground.scale = 3;
    
    invisibleGround = createSprite(300,360,600,5);
    invisibleGround.shapeColor = "red";
    invisibleGround.visible = false;
    
    caveman = createSprite(100,340,50,50);
    caveman.addAnimation("c_rest",cavemanImage);
    caveman.addAnimation("c_running",caveman_running);
    
    caveman.scale = 0.3;
    
    animal = createSprite(250,340,50,50);
    animal.addAnimation("b_rest",bear1Image);
    animal.addAnimation("b_running",bear1_running);
    
    animal.scale = 0.3;
        
    for(var h = 0; h<5; h++){
      honeyBee = createSprite(random(200,600),random(10,100));
      honeyBee.addAnimation("honeyBee", honeyBeeImg);
      honeyBee.scale = 0.1;
      honeyBee.visible = true;
      honeyBee.setVelocity(random(-2,0.5),random(-0.5,0.5))
    }
    
    gameover = createSprite(300,100,50,50);
  // gameover.addImage(gameoverImage);
    gameover.visible = false;
    
    win = createSprite(300,100,50,50);
  // win.addImage(winImage);
    win.visible = false;
    
    treeGroup = new Group();
    trapGroup = new Group();
    fruitGroup =new Group();

    var bearjump = -5;
    var monkeyjump= -12;
    var foxjump=-3;
  
}
  

function draw(){
  background("white");
  if(gameState===begin){
    form=new Form();
    form.display();
  }
  
  //animal.debug = true
  if(gameState===play){
    form.title.html = "";
    spawntree();
    spawnfruit();
    changeAnimal();
    bground.velocityX = -(5+0.5*score/100);
   
    if (bground.x < 0)
        bground.x = bground.width/2; 
  
    //animal jump when on the ground
    if(keyDown(UP_ARROW)&& animal.y>320){
      animal.velocityY = -(12+0.1*score/100);
    }

    if(caveman.y<320){
      caveman.changeAnimation("c_rest",cavemanImage);
    }
    else{
    caveman.changeAnimation("c_running",caveman_running);
    }
    
   if(keyDown("b")){
      animal.changeAnimation("b_running",bear1_running);
      animal.scale = 0.3;
      active_animal = "bear";
    }
    else if(keyDown("f")){
      animal.changeAnimation("f_running",fox_running);
      animal.scale = 0.4;
      active_animal = "fox";
    }
    else if(keyDown("m")){
      animal.changeAnimation("m_running",monkeyRunning);
      animal.scale = 0.08;
      active_animal = "monkey";
  }

    score = score + Math.round(frameRate()/60);
    
    if(trapGroup.isTouching(animal)){ 
      gameState = end;
    //  bear1.velocityY = bear1.velocityY-(1+0.4*score/100);
    }
    
    if(treeGroup.isTouching(animal)){
      gameState = end;
     // bear1.velocityY = bear1.velocityY-(1+0.08*score/100);
    }

    if(trapGroup.isTouching(caveman)){
      caveman.velocityY = -15;  // to go up
      caveman.changeAnimation("c_rest",cavemanImage);
      console.log("jump");
    }
    
    
    if(treeGroup.isTouching(caveman)){
      caveman.velocityY = -(1+0.08*score/100);
      
    }

    if(fruitGroup.isTouching(animal)){
      fruitGroup.destroyEach();
      animal.scale += 0.1;
      score += 100;
     
    }


    /*if(animal.y<320 && active_animal === "bear"){
      animal.changeAnimation("b_rest",bear1Image);
    }
    else{
     animal.changeAnimation("b_running",bear1_running);
    }
  
    if(animal.y<320 && active_animal === "fox"){
      animal.changeAnimation("f_rest",foxImage);
    }
    else{
     animal.changeAnimation("f_running",fox_running);
    }
  
    if(animal.y<320 && active_animal === "monkey"){
      animal.changeAnimation("m_rest",monkeyImage);
    }
    else{
      animal.changeAnimation("m_running",monkeyRunning);
    }*/

  //bear1.velocityX = bear1.velocityX - 0.00001;

  caveman.collide(invisibleGround);
  animal.velocityY = animal.velocityY + 0.5+0.05*score/100;
  animal.collide(invisibleGround);
  caveman.velocityY = caveman.velocityY + 0.5+0.02*score/100;
  caveman.debug = true;
  
  }
  
/*
  
  */
    
 
  if(gameState===end){
    score = 0;   
    if(active_animal === "bear")
      animal.changeAnimation("b_rest",bear1Image);
    else if(active_animal=== "fox")
      animal.changeAnimation("f_rest", foxImage);
    else if(active_animal ==="monkey")
      animal.changeAnimation("m_rest", monkeyImage);

   // caveman.debug = true;
    caveman.setCollider("rectangle",0,0,100,240);
    
    treeGroup.setLifetimeEach(-1);
    treeGroup.setVelocityXEach(0);
  
    trapGroup.setLifetimeEach(-1);
    trapGroup.setVelocityXEach(0);

    fruitGroup.setLifetimeEach(-1);
    fruitGroup.setVelocityXEach(0);
    
    gameover.visible = true;
    caveman.velocityX = caveman.velocityX+0.2;
    caveman.collide(animal);
    bground.velocityX = 0;
  }

 

  
 /* if(caveman.isTouching(bear1)){
    win.visible = true;
    score = 0;
    bground.velocityX = 0;
    
    bear1.velocityX = 0;
    caveman.velocityX = 0;
    
    treeGroup.setLifetimeEach(-1);
    treeGroup.setVelocityXEach(0);
    
    trapGroup.setLifetimeEach(-1);
    trapGroup.setVelocityXEach(0);
    
    
  }*/


  
 // caveman.debug = true;
 // bear1.debug = true;
 
 // caveman.setCollider("rectangle",100,0,350,240)
 // animal.setCollider("rectangle",0,0,140,130);

  
  
  drawSprites();
  
  textSize(25);
  stroke("black");
  fill("black");
  text("Score:"+score,420,50);
}

function spawntree(){
  if (frameCount % 250===0){
    var rand=Math.round(random(1,2))
    switch(rand){
      case 1:
        tree = createSprite(random(700,800),355,50,50);
        tree.addImage(treeImage);
        tree.velocityX = -(5+0.5*score/100);
        tree.scale = 0.3;
        tree.depth = caveman.depth;
        caveman.depth = caveman.depth+1;     
        tree.lifetime = 300; 
        treeGroup.add(tree);
        break;
      case 2: 
        trap = createSprite(random(1000,1100),355,50,50);
        trap.addImage(trapImage);
        trap.velocityX = -(5+0.5*score/100);       
        trap.scale = 0.2;
        //trap.depth = caveman.depth;
        //caveman.depth = caveman.depth+1;
        //trap.depth = bear1.depth;
        //bear1.depth = bear1.depth+1;
        trap.lifetime = 300;
        trapGroup.add(trap);

    }
    

   
  }
}
function changeAnimal(){
  switch(active_animal){
    case "bear" : 
      animal.changeAnimation("b_running",bear1_running);
      foodImg=honeyImg;
      break;
    case "fox" :
      fruit.addImage(cherryImage);
      fruit.scale = 0.2;
    break;

    case "monkey" :
      fruit.addImage(bananaImage);
      fruit.scale = 0.2;
    break;
  }
}

function spawnfruit(){
  if(frameCount % 400===0){
  fruit = createSprite(700,355,50,50);
  fruit.velocityX = -(5+0.5*score/100);
  fruit.lifetime = 500;
  switch(active_animal){
    case "bear" : 
      
      fruit.addImage(honeyImg);
      fruit.scale = 0.2;
    break;

    case "fox" :
      fruit.addImage(cherryImage);
      fruit.scale = 0.2;
    break;

    case "monkey" :
      fruit.addImage(bananaImage);
      fruit.scale = 0.2;
    break;
  }
    fruitGroup.add(fruit);
  }
}












































