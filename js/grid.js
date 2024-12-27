var ctx; //context
var cnv;  //canvas
const LINEWIDTH = 1.5;

ctx = document.getElementById('mcanvas');
cnv = ctx.getContext('2d');

const Grid = function (espacamento, altura, comprimento, cor) {
  this.x = 0,
  this.y = 0,
  this.largura = comprimento,
  this.altura = altura,
  this.visivel = true,
  this.setVisivel = function (opcao) {
      let visible = document.querySelector('input[name="' + opcao + '"]:checked').value;
      this.visivel = true;

      if (visible == 0)
        this.visivel = false
    },
    this.render = function () {

      x = espacamento;
      y = espacamento;
      i = 0;
      j = 0;

      if (this.visivel) {

        for (j = 1; j <= 80; j++) {
          cnv.strokeStyle = cor;
          cnv.lineWidth = LINEWIDTH;

          cnv.beginPath();
          cnv.moveTo(x, 0);
          cnv.lineTo(x, this.altura);
          cnv.stroke();

          cnv.beginPath();
          cnv.moveTo(0, y);
          cnv.lineTo(this.largura, y);
          cnv.stroke();

          y = y + espacamento;
          x = x + espacamento;
        }
      } //gride   
    };
};