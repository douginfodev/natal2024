    var ctx; //context
    var cnv;  //canvas
    
    ctx = document.getElementById('mcanvas');
    cnv = ctx.getContext('2d');
   
    //objeto Reta - pseudo-classe
    const Reta = function (p1x, p1y, p2x, p2y, espessura, id, radius) {
        this.id = id,
            this.x1 = p1x,
            this.y1 = p1y,
            this.x2 = p2x,
            this.y2 = p2y,
            this.espessura = espessura;
        this.render = function (pointAX, pointAY, pointBX, pointBY) {
            cnv.strokeStyle = 'lime';
            cnv.lineWidth = 2;
            cnv.beginPath();
            cnv.moveTo(pointAX, pointAY);
            cnv.lineTo(pointBX, pointBY);
            cnv.stroke();
        };
    };
