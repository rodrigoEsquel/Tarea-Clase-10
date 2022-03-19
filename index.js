function simonDice() {
  /* GLOBALES */
  let secuenciaMaquina = [];
  let nivel = 0;
  const $display = document.querySelector("#display");
  const $botonesUsuario = document.querySelectorAll(".boton");
  const DETENIDO = "detenido",
    MAQUINA = "maquina",
    JUGADOR = "jugador",
    ERROR = "error";
  const ESTADOS = {
    detenido: "Toque Iniciar para comenzar",
    maquina: "Turno de la Máquina",
    jugador: "Tu turno",
    error: "Error, reinicie el juego",
  };

  /* FIN GLOBALES */

  function cambiarDisplay(estado) {
    $display.innerText = ESTADOS[estado];
  }

  function resetearVariables() {
    secuenciaMaquina = [];
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
    setTimeout(function () {
      elemento.classList.remove("bg-opacity-50");
    }, 500);
  }

  function marcarSecuencia(secuenciaMaquina) {
    secuenciaMaquina.forEach(function (elemento, indice) {
      setTimeout(function () {
        marcarBoton(seleccionarBoton(elemento));
      }, 1000 * indice);
    });
  }

  function manejarClick(evento) {
    if (evento.target.id !== secuenciaComparacion.shifth()) {
      perder();
    }
    if (secuenciaComparacion.length === 0) {
      pasarTurno();
    }
  }

  function inicializarSecuenciaComparacion() {
    return [...secuenciaMaquina];
  }

  function habilitarInput() {
    $botonesUsuario.forEach(function (elemento) {
      elemento.onclick = manejarClick;
    });
  }

  function turnoJugador() {
    cambiarDisplay(JUGADOR);
    let secuenciaComparacion = inicializarSecuenciaComparacion();
    habilitarInput();
  }

  function extenderSecuenciaMaquina(secuenciaMaquina) {
    const idBotonNuevo = generarRandom();
    secuenciaMaquina.push(`boton-${idBotonNuevo}`);
  }

  function pasarTurno() {
    if ($display.innerText === ESTADOS.maquina) {
      turnoJugador();
    } else if (
      $display.innerText === ESTADOS.jugador ||
      $display.innerText === ESTADOS.detenido
    ) {
      turnoMaquina();
    } else cambiarDisplay(ERROR);
  }

  function subirNivel() {
    nivel++;
    document.querySelector("#nivel").innerText = `Nivel: ${nivel}`;
  }

  function turnoMaquina() {
    cambiarDisplay(MAQUINA);
    inhabilitarJugador();
    subirNivel();
    extenderSecuenciaMaquina();
    marcarSecuencia();
    setTimeout(function () {
      pasarTurno();
    }, 1000 * (secuenciaMaquina.length + 0.5));
  }

  function comenzarJuego() {
    resetearVariables();
    pasarTurno();
  }
  cambiarDisplay(DETENIDO);
  document.querySelector("#start").onclick = comenzarJuego;
}

simonDice();
