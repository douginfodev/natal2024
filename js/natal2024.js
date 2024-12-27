(function () {

    let ctx;  //context
    let cnv;  //canvas
    const GRIDESPACCING = 80;
    var variables = ["Screen Width: 1920px", "Screen Height: 1080px"];
    var treePoints;
    var treeBalls;
    var collectionPoints = [];
    var collectionBalls = [];
    var gradientSky;
    var gradientGround;

    // Linked Image
    let sideImage = new Image();
    sideImage.src = 'images/barracanvasgreen.png';

    //Linked Image Tree
    let imageTree = new Image();
    imageTree.src = 'images/arvore.png';

    //Draw Images - Pseudo-Object
    const canvasImage = function(image,width,height,positionX,positionY){
        this.width = width;
        this.height = height;
        this.originX = positionX;
        this.originY = positionY;
        this.render = function(){
            cnv.drawImage(image,this.originX,this.originY,this.width,this.height);
        }
    }

    //Draw Text - Pseudo Object
    const canvasText = function (positionX, positionY, text, color, stroke) {
        this.text = text;
        this.font = "100px Arial Bold";
        this.color = color;
        this.originX = positionX;
        this.originY = positionY;
        this.render = function () {
            cnv.font = this.font;

            if (stroke == true) {
                cnv.strokeStyle = this.color;
                cnv.strokeText(this.text, this.originX, this.originY);
            } else {
                cnv.fillStyle = this.color;
                cnv.fillText(this.text, this.originX, this.originY);
            }
        };
    };



    //Level Tree Coordinates
    let treePoint = [
        [350, 700],
        [400, 600],
        [450, 500],
        [500, 400],
        [550, 300],
        [600, 200],
        [650, 100]
    ];

    //Ball Tree Coordinates
    let ballPosition = [
        [400, 650],
        [500, 600],
        [600, 650],
        [680, 600],
        [600, 550],
        [650, 500],
        [700, 550],
        [550, 450],
        [680, 400],
        [650, 350],
        [630, 300],
        [650, 250],
        [680, 200]
    ];

   const sideImageBar = new canvasImage(sideImage,150,800,0,0);
   const imageTree2D = new canvasImage(imageTree,350,600,720,100);
   const gride = new Grid(GRIDESPACCING,800,1900,"#444444FF");
   const titleText1 = new canvasText(250, 180, "FELIZ", "lime", true);
   const titleText2 = new canvasText(950, 180, "NATAL", "white", false);
 

    window.onload = init();
   
    function init() {
        ctx = document.getElementById('mcanvas');

        if (ctx !== null) {
            cnv = ctx.getContext('2d');
            start();
        } else
            alert('Impossible to load canvas');
    };

    function start() {
        gride.render();
        sideImageBar.render();
        imageTree2D.render();
        titleText1.render();
        titleText2.render();

        //Array Levels Tree
        for (index = 0; index < 6; index++) {
            treePoints = new Reta(720, 480, 600, 480, 3, 'T1', 10);
            treePoints.render(720, (900 - 100), treePoint[index][0], treePoint[index][1]);
            collectionPoints.push(treePoints);
        }

        //Array - Ball
        for (countBall = 0; countBall < ballPosition.length; countBall++) {
            if (countBall % 2 == 0)
                treeBalls = new Ball(ballPosition[countBall][0], ballPosition[countBall][1], 'red', 20);
            else
                treeBalls = new Ball(ballPosition[countBall][0], ballPosition[countBall][1], 'yellow', 15);

            treeBalls.render();
            collectionBalls.push(treeBalls);
        }

        //Sky 2D - Linear Gradient Color Setup
        gradientSky = cnv.createLinearGradient(720, 0, 720, 800);
        gradientSky.addColorStop("0.3", "#291E4BFF");
        gradientSky.addColorStop("1", "aqua");

        //Ground 2D - Radila Gradient Color Setup
        gradientGround = cnv.createRadialGradient(720, 700, 1090, 800, 250, 250);
        gradientGround.addColorStop("0.3", "#BA861EFF");
        gradientGround.addColorStop("1", "yellow");

        loop();
    };

    //UPDATE CANVAS
    function update() {
        draw();
    }

    //DRAW CANVAS
    function draw() {
        cnv.fillStyle = 'black';
        cnv.clearRect(0,0,1920,1080);
        gride.render();
        sideImageBar.render();
        

        //Tree Levels Render
        for (var point in collectionPoints) {
            var treeLevels = collectionPoints[point];

            treeLevels.render(720, treePoint[point][1], treePoint[point][0], treePoint[point][1]);
        }
        
        //Ground 2D - render
        cnv.fillStyle = gradientGround;
        cnv.fillRect(720, 700, 1090, 700);

        //Ground Wireframe render
        cnv.strokeStyle = "gray";
        cnv.strokeRect(0, 700, 720, 700);

        //SKY 2D - render
        cnv.fillStyle = gradientSky;
        cnv.fillRect(720, 0, 1090, 700);

        //SkY - Wireframe render
        cnv.strokeStyle = "aqua";
        cnv.strokeRect(0, 0, 720, 700);

        //TRUNK - Wireframe render
        cnv.fillStyle = 'maroon';
        cnv.fillRect(650,700,70,100);

        //Draw Left Side Tree
        cnv.strokeStyle = "lime";
        cnv.beginPath();
        cnv.moveTo(720, 700);
        cnv.lineTo(350, 700);
        cnv.lineTo(450, 600);
        cnv.lineTo(400, 600);

        cnv.lineTo(500, 500);
        cnv.lineTo(450, 500);

        cnv.lineTo(550, 400);
        cnv.lineTo(500, 400);

        cnv.lineTo(600, 300);
        cnv.lineTo(550, 300);

        cnv.lineTo(650, 200);
        cnv.lineTo(600, 200);

        cnv.lineTo(720, 100);
        cnv.lineTo(720, 700);

        cnv.stroke();
        cnv.closePath();

        //Ball Render
        for (var b in collectionBalls) {
            var lightBalls = collectionBalls[b];

            lightBalls.render();
        }    

        //Draw Right Side Tree
        cnv.fillStyle = "green";
        cnv.beginPath();
        cnv.moveTo(720, 700);
        cnv.lineTo(1090, 700);
        cnv.lineTo(990, 600);
        cnv.lineTo(1040, 600);

        cnv.lineTo(940, 500);
        cnv.lineTo(990, 500);

        cnv.lineTo(890, 400);
        cnv.lineTo(940, 400);

        cnv.lineTo(840, 300);
        cnv.lineTo(890, 300);

        cnv.lineTo(790, 200);
        cnv.lineTo(840, 200);

        cnv.lineTo(720, 100);
        cnv.lineTo(720, 700);
        cnv.fill();
        cnv.closePath();

        imageTree2D.render();  

        //Title Text render
        titleText1.render();
        titleText2.render();

        //Trunk 2D
        cnv.fillStyle = 'maroon';
        cnv.fillRect(720,700,70,100);
    }

    //RECURSIVE / LOOP 
    function loop() {
        update();
        draw();
        requestAnimationFrame(loop, ctx);
    }

}());