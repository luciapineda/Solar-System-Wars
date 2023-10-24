/**
 * Author:    Lucia Pineda
 * Created:   02.03.2023
 * Description: Solar System and planet information in Star Wars theme (in p5.js)
 * Data Set obtained from https://devstronomy.com/
 **/
var planetData;
var planetCount;
var planetSizes;
var planetImages;

var planetClicked;
var planetClickedPos;

let backdrop;
let rocket;
let tieFighterImg;
let xWingsImg;
let xWingLag;
let xWings;
let pointX;
let pointY;

//let rocketTrail;
var imgSize;

var planets;
let sun;
let mercuryImg, venusImg, earthImg, marsImg, jupiterImg, saturnImg, uranusImg, neptuneImg, plutoImg, deathStarImg;
var planetImages;

var song;
var laserSound;
var laserPlayed;

var mouse_v;

function preload(){
  //PLANET DATA JSON
  planetData = loadJSON("/data/planets.json");

  //IMAGES
  backdrop = loadImage("/images/stars.jpg");
  mercuryImg = loadImage("/images/Mercury-1.png");
  venusImg = loadImage("/images/Venus-2.png");
  earthImg = loadImage("/images/Earth-3.png");
  marsImg = loadImage("/images/Mars-4.png");
  jupiterImg = loadImage("/images/Jupiter-5.png");
  saturnImg = loadImage("/images/Saturn-6.png");
  uranusImg = loadImage("/images/Uranus-7.png");
  neptuneImg = loadImage("/images/Neptune-8.png");
  plutoImg = loadImage("/images/Pluto-9.png");

  rocket = loadImage("/images/milleniumFalcon.png");
  sun = loadImage("/images/sun.png");
  deathStarImg = loadImage("/images/deathStar.png");
  tieFighterImg = loadImage("/images/tieFighter.png");
  xWingsImg = loadImage("/images/xWings.png");

  //FONT & SOUNDS
  myFont = loadFont('/assets/Kanit-Regular.ttf');
  song = loadSound("/assets/ImperialMarch.mp3");
  laserSound = loadSound("/assets/spaceLaser.mp3");
}


function setup() {
  createCanvas(windowWidth,windowHeight);

  //PLAY SONG
  song.play();
  song.setVolume(0.5);

  console.log("planetData: ", planetData); //Printing to console JSON data
  planetCount = Object.keys(planetData).length; //Initializing number of planets
  planetClicked = ''; //No planet was clicked yet

  //CREATE PLANETS
  planets = [];
  planetSizes = [
    70, //mercury
    90, //venus
   100, //earth
    80, //mars
   150, //jupiter 
   230, //saturn
   110, //uranus
    75, //neptune
    60  //pluto
  ]
  planetImages = [mercuryImg, venusImg, earthImg, marsImg, jupiterImg, saturnImg, uranusImg, neptuneImg, plutoImg];

  for(var i = 0; i < planetCount; i++){
    //create a Planet Object with corresponding coordinates, size, planetData, and image
    planets[i] = new Planet(175 + i * 120, 175 + i * 70, planetSizes[i], planetData[i], planetImages[i]);
  }

  //MOUSE VECTOR 
  settings = {multiplier:0.2, offset:1.0};
  mouse_v = createVector(0,0);

  // //TRAIL ARRAY
  // rocketTrail = [];

  //TIEFIGHTERS
  imgSize = 0;

  //X-WINGS
  pointX = 0;
  pointY = 0;
  xWingLag = 0.03;

  //SOUND
  laserPlayed = 0;
}

function draw() {
  background(0);

  //BACKDROP
  push();
  imageMode(CORNERS);
  image(backdrop, 0, 1000, windowWidth, -100);
  pop();

  //SUN
  image(sun, -160, -160, 350, 350);
  //fill('#FDDA0D');
  //ellipse(0, 0, 350, 350); //half i 350 is 175

  //DEATH STAR
  image(deathStarImg, 1000, 200, 350, 350);

  //PLANETS
  for(var i = 0; i < planetCount; i++){
     //ellipse(175 + i * 100, 175 + i * 90, 100, 100); //plus 20 places
      planets[i].show();
  }

  //IF A PLANET WAS CLICKED
  if(planetClicked){

    //TIE FIGHTER
    push();
    if(imgSize < 120){
      imgSize = imgSize + 0.5;
    }
    image(tieFighterImg, planetClickedPos.x - 150, planetClickedPos.y, imgSize, imgSize);
    pop();

    //LASER BEAM
    push();
    drawingContext.shadowBlur = 40;
    drawingContext.shadowColor = color(50,205,50);
    stroke(255);
    strokeWeight(6);
    line(planetClickedPos.x, planetClickedPos.y, 1140, 315);
    pop();

    //LASER SOUND
    push();
    if(laserPlayed == 0){
      laserSound.play();
      laserSound.setVolume(0.5);
      laserPlayed = 1;
    }
    pop();
    
    //PLANET INFO
    push();
    //Draw rectangle
    fill(90,90,90, 180); //4th parameter is opacity
    translate(planetClickedPos.x + 100, planetClickedPos.y - planetClickedPos.y/2); //translate to nearby clicked planet
    strokeWeight(1);
    stroke(255);
    rect(0, 0, 300, 470, 20);

    //Draw text for planet info
    translate(10, 0);
    fill(255);
    stroke(255);
    
    let yOffset = 10;
    for (const [key, value] of Object.entries(planetData[planetClicked-1])) {
      // console.log(`${key}: ${value}`);
      if(key != 'id' && value != null){
        let keyString = key + '';
        keyString = keyString.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase(); //Splits key values by camel case
        textFont(myFont);
        textSize(16);
        text(keyString + ":  " + value, 0, yOffset+=21);
      }
    }
    pop();
  }
  

 //Rocket Trail
  // fill('#87CEEB44'); //Slightly transparent light blue
  // noStroke();
  // rocketTrail.push(createVector(mouseX, mouseY));

  // if(rocketTrail.length > 80){
  //   //removes first element (aka end of trail)
  //   rocketTrail.shift();
  // }

  // for(let i = 0; i < rocketTrail.length; i++){
  //   const curr = rocketTrail[i]; //current mouse vector;
  //   circle(curr.x+80, curr.y+50, i/2); //circle gets bigger as i gets bigger
  // }


  //X-WINGS POSITIONING (Lagging behind cursor)
  let targetX = mouse_v.x;
  pointX = pointX + ((targetX - pointX) * xWingLag);
  let targetY = mouse_v.y;
  pointY = pointY + ((targetY - pointY) * xWingLag);

  image(xWingsImg, pointX, pointY + 170, 150, 150);



  //MILLENIUM FALCON POSITIONING (On cursor)
  push();
  drawingContext.shadowBlur = 40;
  drawingContext.shadowColor = color(135, 206, 235);
  image(rocket, mouse_v.x, mouse_v.y, 150, 150);
  pop();

}


//UPDATE MOUSE VECTOR WHEN MOUSE MOVES
function mouseMoved()
{
  mouse_v.x = mouseX;
  mouse_v.y = mouseY;
}

//USER CLICKS ANYWHERE
function mousePressed() {
  planetClicked = 0;
  planetClickedPos = 0;
  for(var i = 0; i < planetCount; i++){
    planets[i].clicked(); //Calls this function to check if the click was within a planet
 }
}
