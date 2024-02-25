"use strict";
var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");
let fichasJuego = [];
let botones = [];
let lastClickedFigure = null;
let isMouseDown = false;
let tableroJuego;
var fichaInicX;
var fichaInicY;
var turno = 1;
var fondo = new Image();
fondo.src = './resources/icos/juego/fondoingame.jpg';
var musica = document.getElementById("musica");
var sfx = document.getElementById("sfx");
var muteButtonRadius = 20;
var isMuted = false;
let botonReiniciar = new Boton(ctx, canvas.width - 150, canvas.height - 60, "Reiniciar", 130, 50, 65, 28);
let botonMenu = new Boton(ctx, canvas.width - 350, canvas.height - 60, "Menu", 130, 50, 65, 28);
let modo = "4 en linea";
let goal = 4;
let ganador = 0;
let eligiendo = -1;
let fichaJ1 = new Image();
let fichaJ2 = new Image();
const juego = this;
const duracion = 15;
const temporizador = new Temporizador(canvas, ctx, duracion, this);

function start() {
      var fondoInic = new Image();
      fondoInic.src = './resources/icos/juego/spyfondo.jpg';
      temporizador.detenerTemporizador();
      fondoInic.onload = function () {
            ctx.drawImage(fondoInic, 0, 0, canvas.width, canvas.height);
            menu();
            dibujarBotonMute()
      }
}

function menu() {
      reanudarMusica();
      ctx.textAlign = "left";
      var centro = (canvas.width - 200) / 2;

      ctx.fillStyle = "white";
      ctx.font = "50px Avenir";
      ctx.lineWidth = 10;
      ctx.strokeStyle = "black";
      ctx.strokeText("Espia contra Espia", centro - 90, 90);
      ctx.fillText("Espia contra Espia", centro - 90, 90);


      ctx.font = "25px Avenir";
      ctx.lineWidth = 6;
      ctx.strokeStyle = "black";
      ctx.strokeText('"En linea de guerra"', centro - 15, 140);
      ctx.fillText('"En linea de guerra"', centro - 15, 140);

      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      // Rectángulo "4 en linea"
      let botonCuatroEnLinea = new Boton(ctx, centro, 240, "4 en linea", 200, 60, 200 / 4, 60 / 1.5);
      botonCuatroEnLinea.dibujar();
      botones.push(botonCuatroEnLinea);

      let botonCincoEnLinea = new Boton(ctx, centro, 340, "5 en linea", 200, 60, 200 / 4, 60 / 1.5);
      botonCincoEnLinea.dibujar();
      botones.push(botonCincoEnLinea);

      let botonSeisEnLinea = new Boton(ctx, centro, 440, "6 en linea", 200, 60, 200 / 4, 60 / 1.5);
      botonSeisEnLinea.dibujar();
      botones.push(botonSeisEnLinea);

}

function elegirFicha(figura = lastClickedFigure) {
      clearCanvas();
      botones = [];
      fondo.src = './resources/icos/juego/fondoingame.jpg';
      fondo.onload = function () {
            ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);
            dibujarBotonMute()

            // Dibuja el texto con bordes
            var centro = (canvas.width) / 2;

            // Configuración del texto con borde
            ctx.fillStyle = "white";
            ctx.font = "50px Avenir";

            ctx.font = "25px Avenir";
            ctx.lineWidth = 6;
            ctx.strokeStyle = "black";
            ctx.strokeText('Jugador 1 elige ficha', centro - 15, 200);
            ctx.fillText('Jugador 1 elige ficha', centro - 15, 200);

            var espiaBlanco = new Image();
            espiaBlanco.src = './resources/icos/juego/espiaBlanco.png'
            var espiaNegro = new Image();
            espiaNegro.src = './resources/icos/juego/espiaNegro.png'
            var tom = new Image();
            tom.src = './resources/icos/juego/tom.png'
            var jerry = new Image();
            jerry.src = './resources/icos/juego/jerry.png'

            var fichasCargadas = 0;
            espiaBlanco.onload = espiaNegro.onload = tom.onload = jerry.onload = function () {
                  if (fichasCargadas < 4) {
                        fichasCargadas++;
                        if (fichasCargadas === 4) {
                              
                              let fichaBlanco = new Ficha(espiaBlanco, 480, 310, 100);
                              fichasJuego.push(fichaBlanco);
                              let fichaJerry = new Ficha(jerry, 550, 310, 100, 4);
                              fichasJuego.push(fichaJerry);
                              let fichaTom = new Ficha(tom, 650, 310, 100, 4);
                              fichasJuego.push(fichaTom);
                              let fichaNegro = new Ficha(espiaNegro, 745, 310, 100, 4);
                              fichasJuego.push(fichaNegro);

                              if (eligiendo == 1 && figura != null) {
                                    ctx.strokeText('Jugador 2 elige ficha', centro - 15, 200);
                                    ctx.fillText('Jugador 2 elige ficha', centro - 15, 200);
                                    fichaJ1.src = figura.getImagen();
                              } else if (eligiendo == 2 && figura != null) {
                                    fichaJ2.src = figura.getImagen();
                              }
                              fichaBlanco.dibujar(ctx);
                              fichaJerry.dibujar(ctx);
                              fichaTom.dibujar(ctx);
                              fichaNegro.dibujar(ctx);
                              if (eligiendo == 2) {
                                    fichasJuego = [];
                                    clearCanvas()
                                    reiniciar();
                              }
                        }
                  }
            }

            if(eligiendo == -1){
                  eligiendo ++;
                  elegirFicha();
            }
           
      }
}

function cuatroEnLinea() {
      clearCanvas();
      botones = [];

      var esquina = new Image();
      esquina.src = './resources/icos/juego/esquina.png';
      var borde = new Image();
      borde.src = './resources/icos/juego/borde.png';
      var interior = new Image();
      interior.src = './resources/icos/juego/interior.png';
      // Evento onload para esperar a que todas las imágenes se carguen
      esquina.onload = borde.onload = interior.onload = function () {
            tableroJuego = new Tablero(6, 7, esquina, borde, interior, 400, 180, 1.9);
            tableroJuego.dibujar(ctx);
      };
      cargarFondo();

      var espiaBlanco = new Image();
      espiaBlanco.src = './resources/icos/juego/espiaBlanco.png'
      var espiaNegro = new Image();
      espiaNegro.src = './resources/icos/juego/espiaNegro.png'
      var fichasCargadas = 0;

      espiaBlanco.onload = espiaNegro.onload = function () {
            if (fichasCargadas < 2) {
                  fichasCargadas++;
                  if (fichasCargadas === 2) {
                        repartirFichas(21);
                  }
            }
            temporizador.reiniciarTemporizador();
            temporizador.iniciarTemporizador();
            dibujarBotonMute();
            botonReiniciar.dibujar();
            botonMenu.dibujar();
      }
      reanudarMusica()
      modo = "4 en linea";
}

function cincoEnLinea() {
      clearCanvas();
      botones = [];

      var esquina = new Image();
      esquina.src = './resources/icos/juego/esquina.png';
      var borde = new Image();
      borde.src = './resources/icos/juego/borde.png';
      var interior = new Image();
      interior.src = './resources/icos/juego/interior.png';
      esquina.onload = borde.onload = interior.onload = function () {
            tableroJuego = new Tablero(7, 8, esquina, borde, interior, 380, 180);
            tableroJuego.dibujar(ctx);
      };
      cargarFondo();

      var espiaBlanco = new Image();
      espiaBlanco.src = './resources/icos/juego/espiaBlanco.png'
      var espiaNegro = new Image();
      espiaNegro.src = './resources/icos/juego/espiaNegro.png'
      var fichasCargadas = 0;

      espiaBlanco.onload = espiaNegro.onload = function () {
            if (fichasCargadas < 2) {
                  fichasCargadas++;
                  if (fichasCargadas === 2) {
                        repartirFichas( 21);
                  }
            }
            temporizador.reiniciarTemporizador();
            temporizador.iniciarTemporizador();
            goal = 5;
            dibujarBotonMute()
            botonReiniciar.dibujar();
            botonMenu.dibujar();
      }
      reanudarMusica()
      modo = "5 en linea";
}

function seisEnLinea() {
      clearCanvas();
      botones = [];

      var esquina = new Image();
      esquina.src = './resources/icos/juego/esquina.png';
      var borde = new Image();
      borde.src = './resources/icos/juego/borde.png';
      var interior = new Image();
      interior.src = './resources/icos/juego/interior.png';
      // Evento onload para esperar a que todas las imágenes se carguen
      esquina.onload = borde.onload = interior.onload = function () {
            tableroJuego = new Tablero(8, 9, esquina, borde, interior, 380, 180, 2.2);
            tableroJuego.dibujar(ctx);
      };
      cargarFondo();

      var espiaBlanco = new Image();
      espiaBlanco.src = './resources/icos/juego/espiaBlanco.png'
      var espiaNegro = new Image();
      espiaNegro.src = './resources/icos/juego/espiaNegro.png'
      var fichasCargadas = 0;

      espiaBlanco.onload = espiaNegro.onload = function () {
            if (fichasCargadas < 2) {
                  fichasCargadas++;
                  if (fichasCargadas === 2) {
                        repartirFichas(28);
                  }
            }
            temporizador.reiniciarTemporizador();
            temporizador.iniciarTemporizador();
            goal = 6;
            dibujarBotonMute()
            botonReiniciar.dibujar();
            botonMenu.dibujar();
      }
      reanudarMusica()
      modo = "6 en linea";
}

function repartirFichas(cantFichas) {
      for (let i = 0; i < cantFichas; i++) {
            const x = Math.random() * (230 - 10) + 10;
            const y = Math.random() * (500 - 300) + 300;
            const ficha = new Ficha(fichaJ1, x, y, 100, 1, this);
            ficha.dibujar(ctx);
            fichasJuego.push(ficha);
      }
      for (let i = 0; i < cantFichas; i++) {
            const x = Math.random() * (1200 - 1000) + 1000;
            const y = Math.random() * (500 - 300) + 300;
            const ficha = new Ficha(fichaJ2, x, y, 100, 2, this);
            ficha.dibujar(ctx);
            fichasJuego.push(ficha);
      }
}

function esTurno(ficha) {
      if (ficha.jugador === turno) {
            return true;
      }
      return false;
}

function getGanador() {
      return ganador;
}

function terminarTurno() {

      let h = tableroJuego.chckHorizontal(goal);
      let v = tableroJuego.chckVertical(goal);
      let d = tableroJuego.chckDiagonal(goal);
      if (h != null) {
            definirGanador(turno);
      }
      if (v != null) {
            definirGanador(turno);
      }
      if (d != null) {
            definirGanador(turno);
      }
      turno = (turno === 1) ? 2 : 1;
      temporizador.reiniciarTemporizador();
}

function definirGanador(jugador = turno, tiempo = false) {
      temporizador.detenerTemporizador();
      if (tiempo == true) {
            if (jugador == 1) ganador = 2;
            if (jugador == 2) ganador = 1;
      } else
            ganador = jugador;
      setTimeout(function () {
            temporizador.detenerTemporizador();
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalAlpha = 1;

            var centro = (canvas.width) / 2;

            if (tiempo) {
                  // Borde negro
                  ctx.lineWidth = 10;
                  ctx.strokeStyle = "black";

                  // Relleno blanco con sombra
                  ctx.fillStyle = "white";
                  ctx.shadowColor = "black";
                  ctx.shadowBlur = 10;

                  // Establecer el tamaño y la fuente del texto
                  ctx.font = "40px Arial";

                  // Texto a mostrar
                  const texto = "¡Tiempo agotado! ";

                  // Calcular la posición X para centrar el texto
                  const posX = centro;

                  // Dibujar el texto con borde y sombra
                  ctx.strokeText(texto, posX, 80);
                  ctx.fillText(texto, posX, 80);

                  // Restablecer el sombreado
                  ctx.shadowColor = "transparent";
                  ctx.shadowBlur = 0;
            }

            // Borde negro
            ctx.lineWidth = 10;
            ctx.strokeStyle = "black";

            // Relleno blanco con sombra
            ctx.fillStyle = "white";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 10;

            // Establecer el tamaño y la fuente del texto
            ctx.font = "40px Arial";

            // Texto a mostrar
            const texto = "¡Tenemos un ganador! Jugador " + ganador;

            // Calcular la posición X para centrar el texto
            const posX = centro;

            // Dibujar el texto con borde y sombra
            ctx.strokeText(texto, posX, 130);
            ctx.fillText(texto, posX, 130);

            // Restablecer el sombreado
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            botonReiniciar.dibujar();
            botonMenu.dibujar();
      }, 1000);

}

function cargarFondo() {
      ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);
}



//Eventos del mouse

function getMousePos(event) {
      const canvas = document.getElementById("miCanvas");
      const rect = canvas.getBoundingClientRect();

      return {
            x: Math.round(event.clientX - rect.left),
            y: Math.round(event.clientY - rect.top)
      };
}

function onMouseMove(e) {
      if (isMouseDown && lastClickedFigure != null) {
            if (lastClickedFigure instanceof Ficha && !(lastClickedFigure.colocada) && esTurno(lastClickedFigure) && (ganador == 0)) {
                  let m = getMousePos(e);
                  lastClickedFigure.setPosition(m.x, m.y)
                  clearCanvas();
                  cargarFondo();
                  dibujarBotonMute()
                  botonReiniciar.dibujar();
                  botonMenu.dibujar();
                  dibujarFigura();
                  tableroJuego.dibujar(ctx);
            }
      }
}

function onMouseDown(e) {
      if (ganador == 0) {
            isMouseDown = true;
            let m = getMousePos(e);
            let clickFig = figuraClickeada(m.x, m.y);
            if (clickFig !== null) {
                  this.fichaInicX = lastClickedFigure ? lastClickedFigure.getPosX() : 0;
                  this.fichaInicY = lastClickedFigure ? lastClickedFigure.getPosY() : 0;
                  lastClickedFigure = clickFig;
            }
      }
}

function onMouseUp(e) {
      if (lastClickedFigure != undefined) {
            let pos = lastClickedFigure.getPosition()
            if (tableroJuego) {
                  let clickBox = boxClickeado(pos.x, pos.y, tableroJuego);
                  if (clickBox != null) {
                        let casilla = tableroJuego.getCasillaLibre(clickBox.getColumna());
                        if (casilla != null) {
                              lastClickedFigure.visible = false;
                              limpiar();
                              temporizador.actualizarTemporizador();
                              insertarFicha(casilla, lastClickedFigure);
                              lastClickedFigure.visible = true;
                              terminarTurno()
                        }
                  }
            }
            if (eligiendo < 2) {
                  eligiendo++;
                  elegirFicha(lastClickedFigure);
            }
            lastClickedFigure = null;
      }
      isMouseDown = false;
}

function limpiar() {
      if (ganador == 0) {
            clearCanvas();
            cargarFondo()
            // temporizador.actualizarTemporizador();
            dibujarFigura();
            tableroJuego.dibujar(ctx);
            dibujarBotonMute()
            botonReiniciar.dibujar();
            botonMenu.dibujar();
      }
}

function insertarFicha(casilla, ficha) {
      let pos = casilla.getPosition();
      ficha.animarMovimiento(pos.x, lastClickedFigure.getPosY(), pos.y, casilla.bordeH, casilla.bordeV, juego)
      ficha.colocar();
      casilla.ocupar(ficha.jugador);
}

function clearCanvas() {
      ctx.fillStyle = 'F8F8FF';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarFigura() {
      for (let i = 0; i < fichasJuego.length; i++) {
            if (fichasJuego[i].visible == true) {
                  fichasJuego[i].dibujar(ctx);
            }
      }
}

function figuraClickeada(x, y) {
      for (let i = 0; i < fichasJuego.length; i++) {
            const elemento = fichasJuego[i];
            if (elemento.isPointInside(x, y)) {
                  return elemento;
            }
      }
}

function seleccionarModo(modo) {
      switch (modo) {
            
             case "4 en linea":
                  cuatroEnLinea();
                  break;
            case "5 en linea":
                  cincoEnLinea();
                  break;
      case "6 en linea":
                  seisEnLinea()
                  break;
            default:
                  return;
      }
}

function click(e) {
     let m = getMousePos(e);
      let clickBtn = btnClickeado(m.x, m.y);
      if (clickBtn != null) {
            seleccionarModo(clickBtn.textoBoton);
      }
      if (clickBtn != null) {
            elegirFicha();
      }


      var clickX = e.clientX - canvas.getBoundingClientRect().left;
      var clickY = e.clientY - canvas.getBoundingClientRect().top;

      if (verificarClicMute(clickX, clickY)) {
            isMuted = !isMuted;
            musica.muted = isMuted;
            dibujarBotonMute();
      }
      if (botonReiniciar.isPointInside(clickX, clickY)) {
            reiniciar();
      }
      if (botonMenu.isPointInside(clickX, clickY)) {
            llamarMenu();
      }
}

function reiniciar() {
      turno = 1;
      ganador = 0;
      tableroJuego = [];
      fichasJuego = [];
      botones = [];
      temporizador.reiniciarTemporizador();
      seleccionarModo(modo)
}

function llamarMenu() {
      turno = 1;
      eligiendo = 0;
      ganador = 0;
      tableroJuego = null;
      fichasJuego = [];
      botones = [];
      temporizador.reiniciarTemporizador();
      start();
}

function btnClickeado(x, y) {
      for (let i = 0; i < botones.length; i++) {
            const elemento = botones[i];
            if (elemento.isPointInside(x, y)) {
                  return elemento;
            }
      }
}

function boxClickeado(x, y, tablero) {
      let hiboxesT = tablero.getHitBox();
      for (let i = 0; i < hiboxesT.length; i++) {
            const elemento = hiboxesT[i];
            if (elemento.isPointInside(x, y)) {
                  return elemento;
            }
      }
}

function pausarMusica() {
      musica.pause();
}

function reanudarMusica() {
      musica.play();
}

function detenerMusica() {
      musica.pause();
      musica.currentTime = 0; // Reiniciar al principio
}

function ajustarVolumen(volumen) {
      musica.volume = volumen;
}

function sonidoFicha() {
      if (!isMuted) {
            sfx.playbackRate = 3.5;
            sfx.play();
      }
}

function dibujarBotonMute() {
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(isMuted ? "🔇" : "🔊", muteButtonRadius + 10, canvas.height - (muteButtonRadius + 10));
}

function verificarClicMute(x, y) {
      var distanciaX = x - (muteButtonRadius + 10);
      var distanciaY = y - (canvas.height - (muteButtonRadius + 10));
      var distanciaAlCentro = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

      return distanciaAlCentro <= muteButtonRadius;
}

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp)
canvas.addEventListener("click", click);


start();
