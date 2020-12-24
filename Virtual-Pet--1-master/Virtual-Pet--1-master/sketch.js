//Create variables here
var dog,dogImage,happyDogImage,database,foodS=20,foodStock;

function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png");
  happyDogImage=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(200,250,1,1);
  dog.addImage(dogImage);
  database=firebase.database();
  foodStock=database.ref("Food")
  foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(DOWN_ARROW)){
    rewriteStock(foodS);
    
  }
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }
  fill("black");
  text(foodS,250,250);
  fill("black");
  text("Note:Press UP_ARROW to feed Thor",230,140);
  fill("black");
  text("Note:Press DOWN_ARROW to reset the game.",230,190);
  fill("black");
  text("Note:PLease reset the course before leaving",200,100);
  dogImage.resize(100, 100);
  happyDogImage.resize(100, 100);

  drawSprites();
  //add styles here

}

function readStock(data){
foodS=data.val();

}

function writeStock(m){
  if(m<=0){
    m=0;
  }
  else{
    m=m-1;
  }
database.ref("/").update({
  Food:m
})
}
function rewriteStock(m){
  if(m<=0){
    m=20;
    dog.addImage(dogImage)
  }
 
database.ref("/").update({
  Food:m
})
}