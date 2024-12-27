var ctx; //context
var cnv;  //canvas

ctx = document.getElementById('mcanvas');
cnv = ctx.getContext('2d');

const Ball = function(positionX,positionY,ballColor,raio){
    this.id = '1';
    this.positionX = positionX,
    this.positionY = positionY,
    this.fillColor = ballColor,
    this.color = function(colorName){
      this.fillColor = colorName;
    }
    this.render = function(){
      cnv.strokeStyle = this.fillColor;
      cnv.lineWidth = 2.0;  
      cnv.beginPath();
      cnv.arc(this.positionX,this.positionY,raio,0,Math.PI*2,true);
      cnv.stroke();  
    };//render     
  }; //Ponto