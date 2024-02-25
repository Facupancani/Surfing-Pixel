class Temporizador {
    constructor(canvas, ctx, duracion, juego) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.duracion = duracion;
        this.startTime = Date.now();
        this.animacionFrameId = null;
        this.juego = juego;
        this.fin = false;
        this.animar = true;
    }

    formatearTiempo(tiempo) {
        const minutos = Math.floor(tiempo / 60000);
        const segundos = Math.floor((tiempo % 60000) / 1000);
        return `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
    }

    iniciarTemporizador() {
        this.animacionFrameId = requestAnimationFrame(this.actualizarTemporizador.bind(this));
    }

    reiniciarTemporizador() {
        this.startTime = Date.now();
        this.fin = false;
        this.tiempoRestante = this.duracion * 1000;
        this.animar = true;
    }

    actualizarTemporizador() {
        if (this.animar) {

            const tiempoTranscurrido = Date.now() - this.startTime;
            const tiempoRestante = (this.duracion * 1000) - tiempoTranscurrido;
            const tiempoFormateado = this.formatearTiempo(tiempoRestante);

            // Limpiar el área donde se muestra el temporizador
            ctx.fillStyle = "grey";
            ctx.fillRect(0, 0, 120, 30);


            if (tiempoRestante > 0) {
                this.ctx.font = "16px Arial";
                this.ctx.fillStyle = "white";
                this.ctx.fillText(`Tiempo: ${tiempoFormateado}`, 55, 16);
                this.animacionFrameId = requestAnimationFrame(this.actualizarTemporizador.bind(this));
            } else {
                if (this.fin == false) {
                    this.fin = true;
                    this.tiempoAgotado();
                }
            }
        }
    }

    detenerTemporizador() {
        if (this.animacionFrameId !== null) {
            cancelAnimationFrame(this.animacionFrameId);
            this.animacionFrameId = null;
            this.animar = false;
        }
    }

    tiempoAgotado() {
        if (this.juego.getGanador() == 0)
            this.juego.definirGanador(turno, true);
    }

    getTiempoRestante() {
        return this.tiempoRestante;
    }
}
