const derC = document.querySelectorAll('.botonDerechaChico');
const izqC = document.querySelectorAll('.botonIzquierdaChico');

derC.forEach((boton) => {
  boton.addEventListener('click', () => {
    const contenedor = boton.closest('.carruselData').querySelector('.containerMovedizo');
    const carrusel = contenedor.querySelector('#gameContainer');
    const currentPosition = window.getComputedStyle(carrusel).transform;
    let translateX = 0;

    if (currentPosition !== 'none') {
      const matrix = currentPosition.split(', ');
      translateX = parseInt(matrix[4]) - 1190;
    }

    if (translateX <= 0) {
      carrusel.style.transform = `translateX(${translateX}px)`;
    }

    const botonDerecho = boton.closest('.carruselData').querySelector('.botonDerechaChico');
    const botonIzquierdo = boton.closest('.carruselData').querySelector('.botonIzquierdaChico');

    if (translateX <= -1190) {
      botonDerecho.style.opacity = '0';
      botonDerecho.style.pointerEvents = 'none';
    } else {
      botonDerecho.style.opacity = '100';
      botonDerecho.style.pointerEvents = 'auto';
    }

    botonIzquierdo.style.opacity = '100';
    botonIzquierdo.style.pointerEvents = 'auto';
  });
});

izqC.forEach((boton) => {
  boton.addEventListener('click', () => {
    const contenedor = boton.closest('.carruselData').querySelector('.containerMovedizo');
    const carrusel = contenedor.querySelector('#gameContainer');
    const currentPosition = window.getComputedStyle(carrusel).transform;
    let translateX = 0;

    if (currentPosition !== 'none') {
      const matrix = currentPosition.split(', ');
      translateX = parseInt(matrix[4]) + 1190;
    }

    if (translateX <= 0) {
      carrusel.style.transform = `translateX(${translateX}px)`;
    }

    const botonDerecho = boton.closest('.carruselData').querySelector('.botonDerechaChico');
    const botonIzquierdo = boton.closest('.carruselData').querySelector('.botonIzquierdaChico');

    if (translateX >= 0) { // Cambia este valor al tope izquierdo deseado
      botonIzquierdo.style.opacity = '0';
      botonIzquierdo.style.pointerEvents = 'none';
    } else {
      botonIzquierdo.style.opacity = '100';
      botonIzquierdo.style.pointerEvents = 'auto';
    }

    botonDerecho.style.opacity = '100';
    botonDerecho.style.pointerEvents = 'auto';
  });
});



/* CARRUSEL GRANDE */

const derG = document.querySelectorAll('.botonDerecha');
const izqG = document.querySelectorAll('.botonIzquierda');

derG.forEach((boton) => {
  boton.addEventListener('click', () => {
    const contenedor = boton.closest('.carruselData').querySelector('.containerMovedizo');
    const carrusel = contenedor.querySelector('#gameContainer');
    const currentPosition = window.getComputedStyle(carrusel).transform;
    let translateX = 0;

    if (currentPosition !== 'none') {
      const matrix = currentPosition.split(', ');
      translateX = parseInt(matrix[4]) - 1190;
    }

    if (translateX <= 0) {
      carrusel.style.transform = `translateX(${translateX}px)`;
    }

    const botonDerecho = boton.closest('.carruselData').querySelector('.botonDerechaChico');
    const botonIzquierdo = boton.closest('.carruselData').querySelector('.botonIzquierdaChico');

    if (translateX <= -1190) {
      botonDerecho.style.opacity = '0';
      botonDerecho.style.pointerEvents = 'none';
    } else {
      botonDerecho.style.opacity = '100';
      botonDerecho.style.pointerEvents = 'auto';
    }

    botonIzquierdo.style.opacity = '100';
    botonIzquierdo.style.pointerEvents = 'auto';
  });
});

izqG.forEach((boton) => {
  boton.addEventListener('click', () => {
    const contenedor = boton.closest('.carruselData').querySelector('.containerMovedizo');
    const carrusel = contenedor.querySelector('#gameContainer');
    const currentPosition = window.getComputedStyle(carrusel).transform;
    let translateX = 0;

    if (currentPosition !== 'none') {
      const matrix = currentPosition.split(', ');
      translateX = parseInt(matrix[4]) + 1190;
    }

    if (translateX <= 0) {
      carrusel.style.transform = `translateX(${translateX}px)`;
    }

    const botonDerecho = boton.closest('.carruselData').querySelector('.botonDerecha');
    const botonIzquierdo = boton.closest('.carruselData').querySelector('.botonIzquierda');

    if (translateX >= 0) { // Cambia este valor al tope izquierdo deseado
      botonIzquierdo.style.opacity = '0';
      botonIzquierdo.style.pointerEvents = 'none';
    } else {
      botonIzquierdo.style.opacity = '100';
      botonIzquierdo.style.pointerEvents = 'auto';
    }

    botonDerecho.style.opacity = '100';
    botonDerecho.style.pointerEvents = 'auto';
  });
});

const derCat = document.querySelectorAll('.flechaColor');
const izqCat = document.querySelectorAll('.flechaColorIzq');

derCat.forEach((boton) => {
  boton.addEventListener('click', () => {
    const contenedor = boton.closest('.menuCategorias').querySelector('#catContainer');
    const carrusel = contenedor.querySelector('#menuCategoriasul');
    const currentPosition = window.getComputedStyle(carrusel).transform;
    let translateX = 0;

    if (currentPosition !== 'none') {
      const matrix = currentPosition.split(', ');
      translateX = parseInt(matrix[4]) - 1190;
    }

    if (translateX <= 0) {
      carrusel.style.transform = `translateX(${translateX}px)`;
    }

    const botonDerecho = boton.closest('.menuCategorias').querySelector('.flechaColor');
    const botonIzquierdo = boton.closest('.menuCategorias').querySelector('.flechaColorIzq');

    if (translateX <= -1190) {
      botonDerecho.style.opacity = '0';
      botonDerecho.style.pointerEvents = 'none';
    } else {
      botonDerecho.style.opacity = '1';
      botonDerecho.style.pointerEvents = 'auto';
    }

    botonIzquierdo.style.opacity = '1';
    botonIzquierdo.style.pointerEvents = 'auto';
  });
});

izqCat.forEach((boton) => {
  boton.addEventListener('click', () => {
    const contenedor = boton.closest('.menuCategorias').querySelector('#catContainer');
    const carrusel = contenedor.querySelector('#menuCategoriasul');
    const currentPosition = window.getComputedStyle(carrusel).transform;
    let translateX = 0;

    if (currentPosition !== 'none') {
      const matrix = currentPosition.split(', ');
      translateX = parseInt(matrix[4]) + 1190;
    }

    if (translateX <= 0) {
      carrusel.style.transform = `translateX(${translateX}px)`;
    }

    const botonDerecho = boton.closest('.menuCategorias').querySelector('.flechaColor');
    const botonIzquierdo = boton.closest('.menuCategorias').querySelector('.flechaColorIzq');

    if (translateX >= 0) {
      botonIzquierdo.style.opacity = '0';
      botonIzquierdo.style.pointerEvents = 'none';
    } else {
      botonIzquierdo.style.opacity = '1';
      botonIzquierdo.style.pointerEvents = 'auto';
    }

    botonDerecho.style.opacity = '1';
    botonDerecho.style.pointerEvents = 'auto';
  });
});

/* ANIMACION CARGA */

// Comprobar si loaderNum existe
const loader = document.getElementById("loaderNum");

// Verificar si loader existe
if (loader) {
  // Si loader existe, definir el resto del código
  const overlay = document.getElementById("overlayCarga");

  function startLoading() {
    let percentage = 0;
    const interval = 50; 

    const updateLoader = setInterval(() => {
      percentage++;
      loader.textContent = `${percentage}%`;
      loader.style.width = `${percentage}%`;

      if (percentage >= 100) {
        clearInterval(updateLoader);

        // Cambia la opacidad del overlay cuando la carga haya terminado
        setTimeout(function () {
          overlay.style.opacity = '0';
          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';

          // Después de que la opacidad sea 0, oculta el overlay
          setTimeout(function () {
            overlay.style.display = 'none';
          }, 50); 
        }, 800); 
      }
    }, interval);
  }

  startLoading();
} else {

}


function mostrarReglas() {
  const reglas = document.getElementById("reglas");
  if (reglas) {
    if (reglas.style.display === 'none') {
      reglas.style.animation = 'bounceIn 0.5s'; // Aplicar la animación
      reglas.style.display = 'block';
    } else {
      reglas.style.display = 'none';
    }
  }
}

// Agrega un eventListener al elemento al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  const cardTag = document.getElementById("cardTag");

  cardTag.addEventListener("click", function () {
    cardTag.classList.add("clickeable"); // Agrega la clase "clickeable"
  });
});


/* BOTON FORM */
function registrarse(button) {
  const textoBoton = button.querySelector('.textoBotones');
  textoBoton.textContent = 'Registrado!'; // Cambia el texto del botón
  button.classList.add('bouncing'); // Agrega la clase CSS para la animación
  setTimeout(function () {
    button.classList.remove('bouncing'); // Elimina la clase CSS después de completar la animación
  }, 500); // El tiempo debe coincidir con la duración de la animación
  home()
}


/* MENU DESPLEGABLE */
var menuVisible = false; // Variable para controlar la visibilidad del menú

function toggleMenu() {
  var menu = document.getElementById('menuPerfil');
  var hamburguesa = document.getElementById('hamburguesa');

  if (!menuVisible) {
    if (menu) {
      menu.style.display = 'block'; // Muestra el menú
    }
    hamburguesa.style.display = 'none'; // Oculta la hamburguesa
    menuVisible = true;
  } else {
    if (menu) {
      menu.style.display = 'none'; // Muestra el menú
    }
    hamburguesa.style.display = 'block'; // Muestra la hamburguesa
    menuVisible = false;
  }
}





/* TAG CARRITO */
let estado = false; // Variable para alternar entre estados

function toggleEstado(elemento) {
  const cardTag = elemento;
  const textoBoton = cardTag.querySelector('.textoBotones');
  const carritoIco = cardTag.querySelector('#carritoIco');

  if (estado) {
    // Estado actual: Agregado, cambia a: Agregar
    textoBoton.textContent = 'Agregar';
    textoBoton.style.color = 'white';
    cardTag.style.backgroundImage = 'var(--color-degradeV2)';
    carritoIco.style.opacity = '1'; // Mostrar el carrito
    cardTag.classList.remove('clicked'); // Remover la clase "clicked" al hacer clic
    estado = false;
  } else {
    // Estado actual: Agregar, cambia a: Agregado
    textoBoton.textContent = 'Agregado';
    textoBoton.style.color = 'black';
    cardTag.style.backgroundImage = 'var(--color-degradeTerciario)';
    carritoIco.style.opacity = '0'; // Ocultar el carrito con transición
    cardTag.classList.add('clicked'); // Agregar la clase "clicked" al hacer clic
    estado = true;
  }
}

// Agrega un evento clic para eliminar el carrito
const cardTag = document.getElementById('cardTag');
cardTag.addEventListener('click', function () {
  const carritoIco = this.querySelector('#carritoIco');
  carritoIco.style.opacity = '0'; // Ocultar el carrito al hacer clic
});

const biblioteca = document.getElementById('biblioteca');
const coment = document.getElementById('coment');

biblioteca.addEventListener('mouseenter', function(){
  coment.style.opacity = 1;
  coment.classList.add('girar'); 
});
biblioteca.addEventListener('mouseleave', function(){
  coment.style.opacity = 0;
  coment.classList.remove('girar'); // Quitar clase de animación
});

window.onload = startLoading;

function home() {
  setTimeout(function () {
    window.location.href = 'home.html';
  }, 600)
}
function login() {
  window.location.href = 'signup.html';
}
