function simonDice() {
  /* GLOBALES */
  let secuenciaMaquina = [];
  let nivel = 0;
  const $display = document.querySelector("#display");
  const $botonesUsuario = document.querySelectorAll(".boton");
  const DETENIDO = "detenido",
    MAQUINA = "maquina",
    JUGADOR = "jugador",
    ERROR = "error",
    ANSIOSO = "ansioso";
  const ESTADOS = {
    detenido: "Toque Iniciar para comenzar",
    maquina: "Turno de la Máquina",
    jugador: "Tu turno",
    error: "Error, reinicie el juego",
    ansioso: "Espera tu turno!",
  };

  /* FIN GLOBALES */

  function cambiarDisplay(estado) {
    $display.innerText = ESTADOS[estado];
  }

  function comenzarJuego() {
    cambiarDisplay(DETENIDO);
    resetearVariables();
    pasarTurno();

    function resetearVariables() {
      secuenciaMaquina = [];
      nivel = 0;
    }

    function pasarTurno() {
      if (
        $display.innerText === ESTADOS.maquina ||
        $display.innerText === ESTADOS.ansioso
      ) {
        turnoJugador();
      } else if (
        $display.innerText === ESTADOS.jugador ||
        $display.innerText === ESTADOS.detenido
      ) {
        turnoMaquina();
      } else cambiarDisplay(ERROR);
    }

    function marcarBoton(elemento) {
      elemento.classList.add("bg-opacity-50");
      setTimeout(function () {
        elemento.classList.remove("bg-opacity-50");
      }, 500);
    }

    function deshabilitarJugador() {
      $botonesUsuario.forEach(function (elemento) {
        elemento.onclick = function () {
          if ($display.innerText === ESTADOS.maquina) {
            cambiarDisplay(ANSIOSO);
          }
        };
      });
    }

    function turnoJugador() {
      cambiarDisplay(JUGADOR);
      let secuenciaComparacion = inicializarSecuenciaComparacion();
      habilitarJugador();

      function inicializarSecuenciaComparacion() {
        return [...secuenciaMaquina];
      }

      function habilitarJugador() {
        $botonesUsuario.forEach(function (elemento) {
          elemento.onclick = manejarClick;
        });
      }

      function manejarClick(evento) {
        function perder() {
          cambiarDisplay(ERROR);
          deshabilitarJugador();
        }
        function ganar() {
          deshabilitarJugador();
          setTimeout(() => {
            pasarTurno();
          }, 1000);
        }

        if (evento.target.id !== secuenciaComparacion.shift()) {
          perder();
        }
        marcarBoton(evento.target);
        if (secuenciaComparacion.length === 0) {
          ganar();
        }
      }
    }

    function turnoMaquina() {
      cambiarDisplay(MAQUINA);
      deshabilitarJugador();
      subirNivel();
      extenderSecuenciaMaquina();
      marcarSecuencia();
      setTimeout(function () {
        pasarTurno();
      }, 1000 * secuenciaMaquina.length);

      function subirNivel() {
        nivel++;
        document.querySelector("#nivel").innerText = `Nivel: ${nivel}`;
      }

      function extenderSecuenciaMaquina() {
        function generarRandom() {
          return Math.ceil(Math.random() * 4);
        }
        const idBotonNuevo = generarRandom();
        secuenciaMaquina.push(`boton-${idBotonNuevo}`);
      }

      function marcarSecuencia() {
        function seleccionarBoton(id) {
          return document.querySelector(`#${id}`);
        }

        secuenciaMaquina.forEach(function (elemento, indice) {
          setTimeout(function () {
            marcarBoton(seleccionarBoton(elemento));
          }, 1000 * indice);
        });
      }
    }
  }
  cambiarDisplay(DETENIDO);
  document.querySelector("#start").onclick = comenzarJuego;
}

simonDice();
