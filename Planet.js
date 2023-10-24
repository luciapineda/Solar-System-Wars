/**
 * Author:    Lucia Pineda
 * Created:   02.03.2023
 * Description: Planet class used in Solar System (in p5.js)
 **/
class Planet{

    constructor(x, y, size, dataArr, image)
    {
      this.pos = createVector(x, y); //Planet Position
      this.size = size;              //Size of Planet
      this.x = x;                    //X-Coordinate
      this.dataArr = dataArr;        //Planet Data Array (from JSON Data)
      this.image = image;            //Planet Image


      //FIXING PLANET POSITIONS
      if(this.dataArr.name == 'Jupiter'){
        this.pos.x = this.pos.x + 40;
        this.pos.y = this.pos.y + 10;
      }
      if(this.dataArr.name == 'Saturn'){
        this.pos.x = this.pos.x + 90;
        this.pos.y = this.pos.y + 30;
      }
      if(this.dataArr.name == 'Uranus' || this.dataArr.name == 'Neptune' || this.dataArr.name == 'Pluto'){
        this.pos.x = this.pos.x + 100;
        this.pos.y = this.pos.y + 30;
      }

    }
    
    //DISPLAY PLANET
    show()
    {
      //Distance between mouse and planet position
      var distMP = p5.Vector.dist(this.pos, mouse_v);

      //Constrain(): Constrains a value to not exceed a maximum and minimum value.
      //Multiplier for size of planet depending on mouse hover
      var mult = constrain(map(distMP, 0, this.size, 1.5, 1.0), 1.0, 5.0);

      
      push()
      //Activate green glow if this planet is clicked
      if(planetClicked == this.dataArr.id){
        drawingContext.shadowBlur = 40;
        drawingContext.shadowColor = color(50,205,50);
      }

      imageMode(CENTER);
      image(this.image, this.pos.x, this.pos.y, this.size*mult, this.size*mult);
      //ellipse(this.pos.x,this.pos.y,this.size*mult,this.size*mult);

      pop();
    }


    //USER PRESSED THE MOUSE
    clicked(){
        //IF THE USER CLICKED A PLANET (Mouse is within planet circumference)
        //console.log("dist between mouse and pos: ", dist(this.pos.x, this.pos.y, mouse_v.x, mouse_v.y));
        if (dist(this.pos.x, this.pos.y, mouse_v.x, mouse_v.y) < this.size/2){
          console.log("clicked on ", this.dataArr.name, "!");
          planetClicked = this.dataArr.id;
          planetClickedPos = this.pos;
          imgSize = 0; //for tiefighter
          laserPlayed = 0; //for laser sound
        }else{
          console.log("clicked outside any planet");
        }
    }
}
   