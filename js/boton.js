class Boton {
    constructor(ctx, x, y, textoBoton, ancho, alto, xTexto, yTexto) {
      this.ctx = ctx;
      this.textoBoton = textoBoton;
      this.posX = x;
      this.posY = y;
      this.ancho = ancho;
      this.alto = alto;
      this.xTexto = xTexto;
      this.yTexto = yTexto;
    }
  
    dibujar() {
      // Rectángulo "4 en linea"
      ctx.fillStyle = "white";
      ctx.fillRect(this.posX, this.posY, this.ancho, this.alto);
      ctx.fillStyle = "black";
      ctx.font = "25px Avenir";
      ctx.fillText(this.textoBoton, this.posX + this.ancho/2, this.posY + this.yTexto);
    }
  
    isPointInside(x, y) {
      return x >= this.posX && x <= (this.posX + this.ancho) && y >= this.posY && y <= (this.posY + this.alto);
    }
  }
  