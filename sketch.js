var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var fedtime;
var feed,lastfed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the Dog");
  feed.position(875,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);



  

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedtime = database.ref('FoodTime');
  fedtime.on("value",function(data){
    lastfed = data.val();
  })

  
  textColor = "white";
 
  if(lastfed>= 12){
    text("last feed :" + lastfed + "PM",350,30);
  }else if(lastfed == 0){
    text("last feed :12 AM",350,30);
  }else{
    text("last feed :"+ lastfed + "AM",350,30);
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.deductFood();
  
  
  database.ref('/').update({
    FoodTime:hour()
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
    
  })
}
