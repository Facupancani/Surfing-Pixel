class Tablero {
      constructor(filas, columnas, esquina, borde, interior, posInicialX, posInicialY, escala = 2) {
            this.maxFilas = filas;
            this.maxColumnas = columnas;
            this.esquina = esquina;
            this.borde = borde;
            this.interior = interior;
            this.casillaAncho = 125;
            this.casillaAlto = 125;
            
            
            // Arreglo para almacenar las casillas
            this.casillas = [];
            this.hitBoxes = [];

            var posY = posInicialY;
            for (let fila = 0; fila < this.maxFilas + 1; fila++) {
                  this.casillas[fila] = [];
                  var posX = posInicialX;
                  var bordeH;
                  var bordeV;
                  if (fila == 0) {
                        for (let columna = 1; columna < this.maxColumnas + 1; columna++) {
                              if (columna == 1 || columna == this.maxColumnas) {
                                    this.casillaAncho = 152;
                                    this.casillaAlto = 125;
                              } else {
                                    this.casillaAncho = 125;
                                    this.casillaAlto = 125;
                              }
                              this.casillaAncho /= escala;
                              this.casillaAlto /= escala;
                              const hitBox = new Casilla(
                                    null,
                                    posX,
                                    posY,
                                    this.casillaAncho,
                                    this.casillaAlto,
                                    fila,
                                    columna
                              );
                              this.hitBoxes.push(hitBox);
                              posX += this.casillaAncho;
                        }
                  }
                  this.casillaAncho = 125 / escala;
                  this.casillaAlto = 125 / escala;
                  if (fila > 0) {
                        for (let columna = 1; columna < this.maxColumnas + 1; columna++) {


                              // Determinar qué imagen aplicar en función de la posición
                              let imagen;
                              switch (true) {
                                    case (columna === 1 && fila === 1):
                                          //esquina sup izquierda
                                          this.casillaAncho = 152;
                                          this.casillaAlto = 152;
                                          imagen = this.esquina;
                                          bordeH = "izquierdo";
                                          bordeV = null;
                                          break;
                                    case (columna === this.maxColumnas && fila === 1):
                                          //esquina sup derecha
                                          this.casillaAncho = 152;
                                          this.casillaAlto = 152;
                                          imagen = this.rotarImagen(this.esquina, 90);
                                          bordeH = "derecho";
                                          bordeV = null;
                                          break;
                                    case (columna === 1 && fila === this.maxFilas):
                                          //esquina inf izquierda
                                          this.casillaAncho = 152;
                                          this.casillaAlto = 152;
                                          imagen = this.rotarImagen(this.esquina, 270);
                                          bordeH = "izquierdo";
                                          bordeV = "abajo";
                                          break;
                                    case (columna === this.maxColumnas && fila === this.maxFilas):
                                          //esquina inf derecha
                                          this.casillaAncho = 152;
                                          this.casillaAlto = 152;
                                          imagen = this.rotarImagen(this.esquina, 180);
                                          bordeH = "derecho";
                                          bordeV = "abajo";
                                          break;
                                    case (fila === 1 && columna !== 1 && columna != this.maxColumnas):
                                          //hilera borde superior tablero
                                          this.casillaAncho = 125;
                                          this.casillaAlto = 152;
                                          imagen = this.rotarImagen(this.borde, 90);
                                          bordeH = null;
                                          bordeV = "arriba";
                                          break;
                                    case (columna === 1 && fila !== 1 && fila != this.maxColumnas):
                                          //hilera borde izquierdo tablero
                                          this.casillaAncho = 152;
                                          this.casillaAlto = 125;
                                          imagen = this.borde;
                                          bordeH = "izquierdo";
                                          bordeV = null;
                                          break;
                                    case (columna === this.maxColumnas && fila !== 1 && fila != this.maxColumnas):
                                          //hilera borde derecho tablero
                                          this.casillaAncho = 152;
                                          this.casillaAlto = 125;
                                          imagen = this.rotarImagen(this.borde, 180);
                                          bordeH = "derecho";
                                          bordeV = null;
                                          break;
                                    case (fila === this.maxFilas && columna !== 1 && columna != this.maxColumnas):
                                          //hilera borde inferior tablero
                                          this.casillaAncho = 125;
                                          this.casillaAlto = 152;
                                          imagen = this.rotarImagen(this.borde, 270);
                                          bordeH = null;
                                          bordeV = "abajo";
                                          break;
                                    default:
                                          this.casillaAncho = 125;
                                          this.casillaAlto = 125;
                                          imagen = this.interior;
                                          bordeH = null;
                                          bordeV = null;
                                          break;
                              }

                              this.casillaAncho /= escala;
                              this.casillaAlto /= escala;

                              // Crear una nueva casilla y agregarla al arreglo
                              const nuevaCasilla = new Casilla(
                                    imagen,
                                    (posX),
                                    (posY),
                                    (this.casillaAncho),
                                    (this.casillaAlto),
                                    fila,
                                    columna,
                                    bordeH,
                                    bordeV
                              );
                              this.casillas[fila][columna] = nuevaCasilla;


                              posX += this.casillaAncho;
                        }
                  }
                  posY += this.casillaAlto;
            }

      }


      dibujar(contexto) {
            for (let fila = 1; fila < this.casillas.length; fila++) {
              for (let columna = 1; columna < this.casillas[fila].length; columna++) {
                this.casillas[fila][columna].dibujar(contexto);
              }
            }
          }
          


      rotarImagen(imagen, grados) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = this.casillaAncho;
            canvas.height = this.casillaAlto;

            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((grados * Math.PI) / 180);
            ctx.drawImage(imagen, -imagen.width / 2, -imagen.height / 2);

            var imagenRotada = new Image();
            imagenRotada.src = canvas.toDataURL();
            return imagenRotada;
      }


      getCasillaLibre(columna) {
            let ultimaCasillaLibre = null;
            for (let fila = 0; fila < this.casillas.length; fila++) {
                for (let col = 0; col < this.casillas.length +1; col++) {
                    const casilla = this.casillas[fila][col];
                    if (casilla && casilla.getColumna() === columna && !casilla.ocupada) {
                        ultimaCasillaLibre = casilla;
                    }
                }
            }
            return ultimaCasillaLibre;
        }
      getHitBox() {
            return this.hitBoxes;
      }

        

 chckHorizontal(goal = 4, cantJugadores = 2) {
       for (let jugador = 1; jugador <= cantJugadores; jugador++) {
             for (let fila = 1; fila < this.casillas.length; fila++) {
                   let contador = 0;
                   for (let columna = 1; columna <= this.casillas.length; columna++) {
                if (this.casillas[fila][columna].jugador === jugador) {
                    contador++;
                    if (contador === goal) {
                        return jugador;
                    }
                } else {
                    contador = 0; // Reiniciamos el contador si encontramos una ficha de otro jugador
                }
            }
        }
    }
}


chckVertical(goal = 4, cantJugadores = 2) {
      for (let jugador = 1; jugador <= cantJugadores; jugador++) {
          for (let columna = 1; columna <= this.casillas.length; columna++) {
              let contador = 0;
              for (let fila = 1; fila < this.casillas.length; fila++) {
                  if (this.casillas[fila][columna] && this.casillas[fila][columna].jugador === jugador) {
                      contador++;
                      if (contador === goal) {
                          return jugador;
                      }
                  } else {
                      contador = 0; // Reiniciamos el contador si encontramos una ficha de otro jugador
                  }
              }
          }
      }
  }

  chckDiagonal(goal = 4, cantJugadores = 2) {
      for (let jugador = 1; jugador <= cantJugadores; jugador++) {

          // Comprobación de diagonales ascendentes
          for (let fila = 1; fila < this.casillas.length; fila++) {
              for (let columna = 1; columna < this.casillas.length; columna++) {
                  let contador = 0;
                  for (let i = 0; i < goal; i++) {
                      if (
                          this.casillas[fila + i] &&
                          this.casillas[fila + i][columna + i] &&
                          this.casillas[fila + i][columna + i].jugador === jugador
                      ) {
                          contador++;
                          if (contador === goal) {
                              return jugador;
                          }
                      } else {
                          contador = 0;
                      }
                  }
              }
          }
  
          // Comprobación de diagonales inversas
          for (let fila = 1; fila < this.casillas.length; fila++) {
              for (let columna = 1; columna < this.casillas.length; columna++) {
                  let contador = 0;
                  for (let i = 0; i < goal; i++) {
                      if (
                          this.casillas[fila + i] &&
                          this.casillas[fila + i][columna - i] &&
                          this.casillas[fila + i][columna - i].jugador === jugador
                      ) {
                          contador++;
                          if (contador === goal) {
                            return jugador;
                          }
                      } else {
                          contador = 0;
                      }
                  }
              }
          }
      }
  }
  
  
  

}
