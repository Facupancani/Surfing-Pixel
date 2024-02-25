class Ficha {
    constructor(imagen, x, y, radio, jugador, escala = 8) {
        this.imagen = imagen;
        this.posX = x;
        this.posY = y;
        this.radio = radio;
        this.escala = escala;
        this.colocada = false;
        this.visible = true;
        this.jugador = jugador;
    }

    dibujar(contexto) {
        contexto.drawImage(this.imagen, this.posX, this.posY, this.imagen.width / this.escala, this.imagen.height / this.escala);
    }

    mover(deltaY) {
        this.posY += deltaY;
    }

    getPosX() {
        return this.posX + (this.imagen.width / this.escala) / 2;
    }

    getPosY() {
        return this.posY + (this.imagen.height / this.escala) / 2;
    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        }
    }

    setPosition(x, y) {
        this.posX = x - (this.imagen.width / this.escala / 2);
        this.posY = y - (this.imagen.height / this.escala / 2);
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;

        return Math.sqrt(_x * _x + _y * _y) < this.radio;
    }

    animarMovimiento(posX, posY, posY2, bordeH, bordeV, juego) {
        const canvas = document.getElementById("miCanvas");
        const ctx = canvas.getContext("2d");
        const self = this;
        let correccion = false;
        let posYActual = posY;
        if (bordeH == "izquierdo") {
            posX += 7, 5;
        } else if (bordeH == "derecho") {
            posX -= 7, 5;
        }
        if (bordeV == "abajo") {
            posY2 -= 7.5;
        } else if (bordeV == "arriba") {
            posY2 += 7.5;
        }

        // Función para guardar el fondo en un canvas auxiliar
        function guardarFondo() {
            const fondoCanvas = document.createElement("canvas");
            fondoCanvas.width = canvas.width;
            fondoCanvas.height = canvas.height;
            const fondoCtx = fondoCanvas.getContext("2d");
            fondoCtx.drawImage(canvas, 0, 0);
            return fondoCanvas;
        }
        const fondoCanvas = guardarFondo();
        
        function cuadroDeAnimacion() {
            ctx.drawImage(fondoCanvas, 0, 0);

            // Dibujar la ficha en su frame actual
            self.setPosition(posX, posYActual);
            self.dibujar(ctx);

            // Dibujar el tablero arriba de la ficha
            tableroJuego.dibujar(ctx);

            // Actualizar la posición en Y para simular el movimiento, es la velocidad
            posYActual += 10;

            // Continuar la animación hasta que la ficha alcance la posición final en Y
            if (posYActual <= posY2) {
                requestAnimationFrame(cuadroDeAnimacion);
            }else if(correccion == false){
                posYActual = posY2;
                correccion = true;
                juego.sonidoFicha();
                requestAnimationFrame(cuadroDeAnimacion);
            }
        }
        
        // Iniciar la animación
        cuadroDeAnimacion();
    }

    getImagen(){
        return this.imagen.src;
    }

    colocar() {
        this.colocada = true;
    }

    colocada() {
        return this.colocada;
    }




}

