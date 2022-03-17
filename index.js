let secuenciaMaquina = [];
let secuenciaJugador = [];
let nivel = 0;
let display = document.querySelector("#display");

const ESTADOS = {
  detenido: "Toque Iniciar para comenzar",
  maquina: "Turno de la Máquina",
  jugador: "Tu turno",
  error: "Error, reinicie el juego",
};

function cambiarDisplay(estado) {
  display.innerText = ESTADOS[estado];
}

function resetearVariables() {
  cambiarDisplay("detenido");
  secuenciaMaquina = [];
  secuenciaJugador = [];
  nivel = 0;
}

function generarRandom() {
  return Math.ceil(Math.random() * 4);
}

function seleccionarBoton(num) {
  return document.querySelector(`#boton-${num}`);
}

function marcarBoton(elemento) {
  elemento.classList.add("bg-opacity-50");
  console.log("ahora");
  setTimeout(function () {
    elemento.classList.remove("bg-opacity-50");
  }, 500);
}

function marcarSecuencia() {
  secuenciaMaquina.forEach(function (elemento,indice) {
    setTimeout(function () {
      marcarBoton(seleccionarBoton(elemento));
    }, 1000*indice); 
  });
}

function turnoJugador() {
  cambiarDisplay("jugador");
}

function extenderSecuenciaMaquina() {
  const idBotonNuevo = generarRandom();
  secuenciaMaquina.push(idBotonNuevo);
}

function pasarTurno() {
  if (display.innerText === ESTADOS.maquina) {
    turnoJugador();
  } else if (
    display.innerText === ESTADOS.jugador ||
    display.innerText === ESTADOS.detenido
  ) {
    turnoMaquina();
  } else cambiarDisplay("error");
}

function subirNivel() {
  nivel++;
  document.querySelector("#nivel").innerText = `Nivel: ${nivel}`;
}

function turnoMaquina() {
  cambiarDisplay("maquina");
  subirNivel();
  extenderSecuenciaMaquina();
  marcarSecuencia();
  setTimeout(function () {
    pasarTurno();
  }, 1000*(secuenciaMaquina.length+0.5));  
}

function comenzarJuego() {
  resetearVariables();
  pasarTurno();
}

document.querySelector("#start").onclick = comenzarJuego;
