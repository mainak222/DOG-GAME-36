var dog ;
var happyDog ; 
var database ; 
var foodS ;
var foodStock ; 
var dogImg1;
var dogImg;

var lastFed;
var fedTime; 



function preload(){
  dogImg = loadImage("images/dogimg.png");
  dogImg1 = loadImage("images/dogimg1.png");

}
function setup(){
  database = firebase.database();
  createCanvas(1000,800);

foodStock = database.ref('Food');
foodStock.on("value",readStock);
foodObj=new Food();

feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);



  var canvas = createCanvas(500,500);
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

}
function draw(){
  background(46,139,87);
  //dog.display();
  //happyDog.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 


  drawSprites()
  
  foodObj.display();



}
function readStock(data){
  foodObj.updateFoodStock(foodS);
  foodS= data.val()
}

function feedDog(){
  dog.addImage(happyDog);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

  
  database.ref('/').update({
    Food:x
  })

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}