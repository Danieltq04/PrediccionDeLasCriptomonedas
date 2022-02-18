//Servidor con express
const express = require("express");
const http = require("http");
const app = express();
const servidor = http.createServer(app);


//Inicializamos socketio
const socketio = require("socket.io");
const io = socketio(servidor);
const DIAS_ATRAS = 7;
const fetch = require("node-fetch");
let contador = 0;


let i = 0;
let observandoresBitcoin = 0;
let observandoresEthereum = 0;
let observandoresTether = 0;
let observandoresDogecoin = 0;

//Funcionalidad de socket.io en el servidor
io.on("connection", (socket) => {
  socket.on("connection", () => {
    contador++;
    io.emit("u_conectados",contador);
  });
  socket.on("disconnect", () => {
    contador--;
    io.emit("u_conectados",contador);
  });

  socket.on("criptomoneda", (moneda) => {
    if(moneda == "bitcoin"){
      observandoresBitcoin++;
      observandoresBitcoin--;
      DetallesCriptomoneda(moneda, observandoresBitcoin);
    }
    else if(moneda == "ethereum"){
      DetallesCriptomoneda(moneda, observandoresEthereum);
    }
    else if(moneda == "tether"){
      DetallesCriptomoneda(moneda, observandoresTether);
    }
    else if(moneda == "dogecoin"){
      DetallesCriptomoneda(moneda, observandoresDogecoin);
    }
    //DetallesCriptomoneda(moneda);
  });

  socket.on("observando", (moneda) => {
    Observadores(moneda);
  });
  socket.on("cerrando", (moneda) => {
    Cerrando(moneda);
  });
});


servidor.listen(5000, () => console.log("Servidor inicializado"));

function Observadores(moneda) {
  if(moneda == "bitcoin"){
    observandoresBitcoin++;
    /*console.log("Observando Bitcoin: ",observandoresBitcoin)
    io.emit("obs_bitcoin",observandoresBitcoin);*/
    DetallesCriptomoneda(moneda, observandoresBitcoin);
  }
  else if(moneda == "ethereum"){
    observandoresEthereum++;
    DetallesCriptomoneda(moneda, observandoresEthereum);
  }
  else if(moneda == "tether"){
    observandoresTether++;
    DetallesCriptomoneda(moneda, observandoresTether);
  }
  else if(moneda == "dogecoin"){
    observandoresDogecoin++;
    DetallesCriptomoneda(moneda, observandoresDogecoin);
  }
}
function Cerrando(moneda) {
  if(moneda == "bitcoin"){
    observandoresBitcoin--;
    console.log("Resto a: ", observandoresBitcoin)
    DetallesCriptomoneda(moneda, observandoresBitcoin);

  }
  else if(moneda == "ethereum"){
    observandoresEthereum--;
    DetallesCriptomoneda(moneda, observandoresEthereum);
  }
  else if(moneda == "tether"){
    observandoresTether--;
    DetallesCriptomoneda(moneda, observandoresTether);
  }
  else if(moneda == "dogecoin"){
    observandoresDogecoin--;
    DetallesCriptomoneda(moneda, observandoresDogecoin);
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
   if ((new Date().getTime() - start) > milliseconds) {
    break;
   }
  }
}
//EMPIEZA LA FUNCIÓN
  
function DetallesCriptomoneda(moneda, obs) {
  console.log("Entro a la funcion, obs:",obs);
  var options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
  };
  fetch("https://api.coingecko.com/api/v3/coins/"+moneda+"/market_chart?vs_currency=usd&days=" + DIAS_ATRAS, options)
      .then(response => {
          return response.json()
      })
      .then(json => {
          CalcularFuncion(moneda,json.prices, obs);
      })
      .catch(err => console.log('ERROR: ' + err))
}


function CalcularFuncion(moneda,lista_precios, obs) {
  var parametros = ["-7d"];
  var valores = [];

  var sumatoriaX = 0;
  var sumatoriaY = 0;
  var sumatoriaXporY = 0;
  var sumatoriaXcuadrado = 0;
  var numero_elemento = 0;
  lista_precios.forEach(precio => {
    numero_elemento++;
    sumatoriaX = sumatoriaX + numero_elemento;
    sumatoriaY = sumatoriaY + precio[1];
    sumatoriaXporY = sumatoriaXporY + numero_elemento * precio[1];
    sumatoriaXcuadrado = sumatoriaXcuadrado + numero_elemento * numero_elemento;

    parametros.push('   ');//Nuevo
    valores.push(precio[1]);
    //i++;
  })
  parametros[parametros.length-1] = "Hoy";
  parametros[parametros.length-2] = "Hoy";
  parametros[parametros.length-3] = "Hoy";
  parametros[parametros.length-4] = "Hoy";
  parametros[parametros.length-5] = "Hoy";
  parametros[parametros.length-6] = "Hoy";
  parametros[parametros.length-7] = "Hoy";
  parametros[parametros.length-8] = "Hoy";
  parametros[parametros.length-9] = "Hoy";
  parametros[parametros.length-10] = "Hoy";
  parametros[parametros.length-11] = "Hoy";
  parametros[parametros.length-12] = "Hoy";
  parametros[parametros.length-13] = "Hoy";
  parametros[parametros.length-14] = "Hoy";
  parametros[parametros.length-15] = "Hoy";


  var pendiente;
  var ordenada;
  pendiente = (numero_elemento * sumatoriaXporY - sumatoriaX * sumatoriaY) / (numero_elemento * sumatoriaXcuadrado - sumatoriaX * sumatoriaX);
  ordenada = ((sumatoriaY / numero_elemento) - pendiente * sumatoriaX / numero_elemento);
  var precio_ahora = lista_precios[numero_elemento - 1][1];
  var precio_hace_7_dias = pendiente * (numero_elemento - 7 * numero_elemento / DIAS_ATRAS) + ordenada;
  var predicion_1_dia = pendiente * (numero_elemento + (numero_elemento / DIAS_ATRAS)) + ordenada;
  var prediccion_7_dias = pendiente * (numero_elemento + numero_elemento) + ordenada;
  /* ARREGLO DEL PORCENTAJE*/
  precio_hace_7_dias = lista_precios[0][1]; //Borrar en todo caso
  var porcentaje_7_dias = precio_ahora * 100 / precio_hace_7_dias;
  var options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  };
  fetch("https://api.coingecko.com/api/v3/coins/"+moneda+"/market_chart?vs_currency=usd&days=1", options)
    .then(response => {
        return response.json()
    })
    .then(json => {
        mostrarValores("--", moneda, precio_ahora, json.prices, porcentaje_7_dias, predicion_1_dia, prediccion_7_dias, parametros, valores, obs);
    })
    .catch(err => console.log('ERROR: ' + err))
}

function mostrarValores(imagen, moneda, precio_actual, precio_hace_1_dia, porcentaje_7_dias, prediccion_1, prediccion_7, parametros, valores, obs) {
  var porcentaje_1_dia = precio_actual * 100 / precio_hace_1_dia[0][1];
  var p_1_dia, p_7_dias;
  var color_trazo;
  if (100 - porcentaje_1_dia <= 0) {
    p_1_dia = "+"+((100-porcentaje_1_dia)*(-1)).toFixed(2) + "%"
  } else {
    p_1_dia = "-"+(100 - porcentaje_1_dia).toFixed(2) + "%"
  }
  if (100 - porcentaje_7_dias <= 0) {
    p_7_dias = "+"+((100-porcentaje_7_dias)*(-1)).toFixed(2) + "%";
    color_trazo = 'rgb(85, 235, 72)';
  } else {
    p_7_dias = "-"+(100 - porcentaje_7_dias).toFixed(2)+ "%";
    color_trazo = 'rgb(255, 78, 78)';
  }

  
  /*io.emit("valores_estadisticos",imagen,moneda,precio_actual, p_1_dia, p_7_dias,
  ((prediccion_1+precio_actual*porcentaje_1_dia/100*2)/3).toFixed(2),
  ((prediccion_7+precio_actual*porcentaje_7_dias/100*2)/3).toFixed(2));*/

  console.log("por enviar resultados...");

  console.log("Observadores:");
  
  io.emit("detalles_criptomonedas"+moneda, {
    nombre_moneda: moneda.toUpperCase(),
    actual: precio_actual.toFixed(2),
    promedio_en_1: p_1_dia,
    promedio_en_7: p_7_dias,
    predic_1: parseFloat(((prediccion_1+precio_actual*porcentaje_1_dia/100*2)/3).toFixed(2)),
    predic_7: parseFloat(((prediccion_7+precio_actual*porcentaje_7_dias/100*2)/3).toFixed(2)),
    param: parametros,
    val: valores,
    observadores: obs,
    color: color_trazo
  })

  /*
  setTimeout(() => {
    DetallesCriptomoneda(moneda)
  }, 10000);
  sleep(10000)*/
}
