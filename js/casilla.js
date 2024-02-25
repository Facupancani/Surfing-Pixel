class Casilla {
  constructor(imagen, x, y, ancho, alto, fila, columna, bordeH = null, bordeV = null) {
    this.imagen = imagen;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.fila = fila;
    this.columna = columna;
    this.ocupada = false;
    this.jugador;
    this.bordeV = bordeV;
    this.bordeH = bordeH;
  }

  getPosX() {
    return this.x + this.ancho / 2;
  }

  getPosY() {
    return this.y + this.alto / 2;
  }

  getPosition() {
    return {
      x: this.getPosX(),
      y: this.getPosY()
    };
  }

  ocupar(jugador) {
    this.jugador = jugador;
    this.ocupada = true;
    return;
  }

  getColumna() {
    return this.columna;
  }
  getFila() {
    return this.fila;
  }


  dibujar(contexto) {
    contexto.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);
  }

  isPointInside(x, y) {
    return x >= this.x && x <= (this.x + this.ancho) && y >= this.y && y <= (this.y + this.alto);
  }

}
