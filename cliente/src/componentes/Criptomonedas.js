import React, { useState, useEffect } from "react";
import socket from "./Socket";
//import LineChart from './LineChart';
//import Maquetar from './Maquetar';
import "../App.css";
import { Line } from 'react-chartjs-2';
import { Modal, Button} from 'react-bootstrap';
import CachedIcon from '@material-ui/icons/Cached';
import PersonIcon from '@material-ui/icons/Person';
//socket.emit("criptomoneda","bitcoin");

console.log("abro una ventana");

let contadorBitcoin = 0;
let graficoBitcoin;
let contadorEthereum = 0;
let graficoEthereum;
let contadorTether = 0;
let graficoTether;
let contadorDogecoin = 0;
let graficoDogecoin;

let ventanaActual = "nada";

const Criptomonedas = () => {
  let value = 0;
  const [conectados, setConectados] = useState(value);

  const [criptomoneda, setCriptomoneda] = useState(value);
  const [ethereum, setEthereum] = useState(value);
  const [tether, setTether] = useState(value);
  const [dogecoin, setDogecoin] = useState(value);
  const [cardano, setCardano] = useState(value);

  /*Nuevo Código*/
  const [show, setShow] = useState(false);
  const [criptoActual, setCriptoActual] = useState(value);
  const [graficoActual, setGraficoActual] = useState(value);

  const handleShowBitcoin = () => {
    ventanaActual = "bitcoin";
    setShow(true)
    socket.emit("observando","bitcoin");
    setCriptoActual(criptomoneda);
    //setcontadorActual(criptomoneda.observadores);
    setGraficoActual(graficoBitcoin);
  };
  const handleShowEthereum = () => {
    ventanaActual = "ethereum";
    setShow(true)
    socket.emit("observando","ethereum");
    setCriptoActual(ethereum);
    //setcontadorActual(ethereum.observadores)
    setGraficoActual(graficoEthereum);
  };
  const handleShowTether = () => {
    ventanaActual = "tether";
    setShow(true);
    socket.emit("observando","tether");
    setCriptoActual(tether);
    //setcontadorActual(tether.observadores);
    setGraficoActual(graficoTether);
  };
  const handleShowDogecoin = () => {
    ventanaActual = "dogecoin";
    setShow(true)
    socket.emit("observando","dogecoin");
    setCriptoActual(dogecoin);
    //setcontadorActual(dogecoin.observadores);
    setGraficoActual(graficoDogecoin);
  };
  
  const handleClose = () => {
    setShow(false)
    if(ventanaActual === "bitcoin" ) {
      socket.emit("cerrando","bitcoin");
      setCriptoActual(criptomoneda);
    }
    else if(ventanaActual === "ethereum") {
      socket.emit("cerrando","ethereum");
      setCriptoActual(ethereum);    
    }
    else if(ventanaActual === "tether") {
      socket.emit("cerrando","tether");
      setCriptoActual(tether);    
    }
    else if(ventanaActual === "dogecoin") {
      socket.emit("cerrando","dogecoin");
      setCriptoActual(dogecoin);    
    }
  };
  /*    */
  

  const actualizar = () => {
    socket.emit("criptomoneda","bitcoin");
    socket.emit("criptomoneda","ethereum");
    socket.emit("criptomoneda","tether");
    socket.emit("criptomoneda","dogecoin");
    socket.emit("criptomoneda","cardano");
  }


  useEffect(() => {
    socket.emit("criptomoneda","bitcoin");
  }, []);

  useEffect(() => {
    socket.on("valores_estadisticosbitcoin", (valores) => {
      let nuevos_valores = valores;
      if(contadorBitcoin===0) {
        graficoBitcoin = 
          (<Line
            data = {{
                labels: valores.param,
                datasets: [
                    {
                      label: valores.c_moneda.toUpperCase(),
                        data: valores.val,
                        backgroundColor: 'transparent',
                        borderColor: valores.color,
                        borderWidth: 4,
                        tension: 0.1,
                        fill: false,
                    }
                ]
            }}
            options = {{
                elements: {
                  line: {
                    borderWidth: 8,
                    fill: false,
                  },
                  point: {
                    radius: .1,
                    borderWidth: 4,
                    backgroundColor: 'white',
                    hoverRadius: 6,
                    hoverBorderWidth: 4,
                  }
                }
              }}
          />)
      }
      contadorBitcoin++;
      console.log(contadorBitcoin);
      console.log(nuevos_valores)
      setCriptomoneda(nuevos_valores);

      
      return () => {
        socket.off();
      };
    });
  }, [criptomoneda]);
  
  /* ETHEREUM */
  useEffect(() => {
    socket.emit("criptomoneda","ethereum");
  }, []);
  useEffect(() => {
    socket.on("valores_estadisticosethereum", (valores) => {
      let nuevos_valores = valores;
      console.log(valores.color)
      if(contadorEthereum===0) {

      graficoEthereum = 
      (<Line
        data = {{
            labels: valores.param,
            datasets: [
                {
                  label: valores.c_moneda.toUpperCase(),
                    data: valores.val,
                    backgroundColor: 'transparent',
                    borderColor: valores.color,
                    borderWidth: 4,
                    tension: 0.1,
                    fill: false,
                }
            ]
        }}
        options = {{
            elements: {
              line: {
                borderWidth: 8,
                fill: false,
              },
              point: {
                radius: .1,
                borderWidth: 4,
                backgroundColor: 'white',
                hoverRadius: 6,
                hoverBorderWidth: 4,
              }
            }
          }}
      />)
      }
      contadorEthereum++;
      console.log(nuevos_valores);
      setEthereum(nuevos_valores);
    });
  }, [ethereum]);

  /* TETHER */
  useEffect(() => {
    socket.emit("criptomoneda","tether");
  }, []);
  useEffect(() => {
    socket.on("valores_estadisticostether", (valores) => {
      let nuevos_valores = valores;
      if(contadorTether===0) {
        graficoTether = 
          (<Line
            data = {{
                labels: valores.param,
                datasets: [
                    {
                      label: valores.c_moneda.toUpperCase(),
                        data: valores.val,
                        backgroundColor: 'transparent',
                        borderColor: valores.color,
                        borderWidth: 4,
                        tension: 0.1,
                        fill: false,
                    }
                ]
            }}
            options = {{
                elements: {
                  line: {
                    borderWidth: 8,
                    fill: false,
                  },
                  point: {
                    radius: .1,
                    borderWidth: 4,
                    backgroundColor: 'white',
                    hoverRadius: 6,
                    hoverBorderWidth: 4,
                  }
                }
              }}
          />)
      }
      contadorTether++;
      setTether(nuevos_valores);
    });
  }, [tether]);

  /* DOGECOIN */
  useEffect(() => {
    socket.emit("criptomoneda","dogecoin");
  }, []);
  useEffect(() => {
    socket.on("valores_estadisticosdogecoin", (valores) => {
      let nuevos_valores = valores;
      if(contadorDogecoin===0) {
        graficoDogecoin = 
        (<Line
          data = {{
              labels: valores.param,
              datasets: [
                  {
                    label: valores.c_moneda.toUpperCase(),
                      data: valores.val,
                      backgroundColor: 'transparent',
                      borderColor: valores.color,
                      borderWidth: 4,
                      tension: 0.1,
                      fill: false,
                  }
              ]
          }}
          options = {{
              elements: {
                line: {
                  borderWidth: 8,
                  fill: false,
                },
                point: {
                  radius: .1,
                  borderWidth: 4,
                  backgroundColor: 'white',
                  hoverRadius: 6,
                  hoverBorderWidth: 4,
                }
              }
            }}
        />)
      }
      contadorDogecoin++;
      setDogecoin(nuevos_valores);
    });
  }, [dogecoin]);

  /* CARDANO */
  useEffect(() => {
    console.log("Actualizo todas???");
    socket.emit("criptomoneda","cardano");
  }, []);
  useEffect(() => {
    socket.on("valores_estadisticoscardano", (valores) => {
      let nuevos_valores = valores;
      nuevos_valores.param = 
        (<Line
          data = {{
              //labels: valores.param,
              datasets: [
                  {
                    label: valores.c_moneda.toUpperCase(),
                      data: valores.val,
                      backgroundColor: 'transparent',
                      borderColor: valores.color,
                      borderWidth: 4,
                      tension: 0.1,
                      fill: false,
                  }
              ]
          }}
          options = {{
              elements: {
                line: {
                  borderWidth: 8,
                  fill: false,
                },
                point: {
                  radius: .1,
                  borderWidth: 4,
                  backgroundColor: 'white',
                  hoverRadius: 6,
                  hoverBorderWidth: 4,
                }
              },
              scales: {
                xAxes: [
                  {
                    display: true,
                    gridLines: {
                      display: false
                    },
                
                    labels: valores.param,
                  }
                ],
                
                }
            }}
        />)
      setCardano(nuevos_valores);
    });
  }, [cardano]);

  
  useEffect(() => {
    socket.on("u_conectados", (usuarios) => {
      console.log("Usuarios: ",usuarios)
      setConectados(usuarios);
    });
  }, [conectados]);
  
  
  useEffect(() => {
    socket.emit("conectado");
  }, []);
  
  
  return (
    <>
        <div className="barraDatos">
          <div id="conectados">{conectados}<PersonIcon fontSize="large"/>
          <Button onClick= {actualizar} className="btn btn-info" id="actualizar" data-toggle="modal">
          <CachedIcon />
          </Button>
          </div>
        </div>



        <div className="contenedor-monedas">

          <button id="cripto1" onClick= {handleShowBitcoin}>
            <div className="detalles-criptomoneda">
              <div className="imagen"></div>
              <div className="detalle-criptomoneda">{criptomoneda.c_moneda + " " +criptomoneda.actual + "$" }</div>
            </div>
            <div className="evolucion">Evolución</div>
            <div className="porcentajes">
              <div className="porcentaje-1">Ultimo día: {criptomoneda.p_1}</div>
              <div className="porcentaje-7">Ultimos 7 días: {criptomoneda.p_7}</div>
            </div>
            <div className="predicciones">Predicciones a futuro</div>
            <div className="valores-predicciones">
              <div className="prediccion-1">A 1 día: {(parseFloat(criptomoneda.pred_1) + (parseFloat(criptomoneda.observadores)*parseFloat(criptomoneda.pred_1)*0.01/100)).toFixed(2)}{"$"}</div>
              <div className="prediccion-7">A 7 días: {(parseFloat(criptomoneda.pred_7) + (parseFloat(criptomoneda.observadores)*parseFloat(criptomoneda.pred_7)*0.01/100)).toFixed(2)}{"$"}</div>
            </div>
            <div id="conteiner-canvas">
              <div id={"conteiner-canvas2"+criptomoneda.c_moneda}>
                {graficoBitcoin}
              </div>
            </div>
          </button>
          
          

          <button id="cripto1" onClick= {handleShowEthereum}>
            <div className="detalles-criptomoneda">
              <div className="imagen"></div>
              <div className="detalle-criptomoneda">{ethereum.c_moneda + " " +ethereum.actual + "$"}</div>
            </div>
            <div className="evolucion">Evolución</div>
            <div className="porcentajes">
              <div className="porcentaje-1">Ultimo día: {ethereum.p_1}</div>
              <div className="porcentaje-7">Ultimos 7 días: {ethereum.p_7}</div>
            </div>
            <div className="predicciones">Predicciones a futuro</div>
            <div className="valores-predicciones">
              <div className="prediccion-1">A 1 día: {(parseFloat(ethereum.pred_1) + (parseFloat(ethereum.observadores)*parseFloat(ethereum.pred_1)*0.001/100)).toFixed(2)}{"$"}</div>
              <div className="prediccion-7">A 7 días: {(parseFloat(ethereum.pred_7) + (parseFloat(ethereum.observadores)*parseFloat(ethereum.pred_7)*0.001/100)).toFixed(2)}{"$"}</div>
            </div>
            <div id="conteiner-canvas">
              <div id={"conteiner-canvas2"+ethereum.c_moneda}>
                {graficoEthereum}
              </div>
            </div>
          </button>


          <button id="cripto1" onClick= {handleShowTether} value = {tether}>
            <div className="detalles-criptomoneda">
              <div className="imagen"></div>
              <div className="detalle-criptomoneda">{tether.c_moneda + " " +tether.actual + "$"}</div>
            </div>
            <div className="evolucion">Evolución</div>
            <div className="porcentajes">
              <div className="porcentaje-1">Ultimo día: {tether.p_1}</div>
              <div className="porcentaje-7">Ultimos 7 días: {tether.p_7}</div>
            </div>
            <div className="predicciones">Predicciones a futuro</div>
            <div className="valores-predicciones">
              <div className="prediccion-1">A 1 día: {(parseFloat(tether.pred_1) + (parseFloat(tether.observadores)*parseFloat(tether.pred_1)*0.01/100)).toFixed(2)}{"$"}</div>
              <div className="prediccion-7">A 7 días: {(parseFloat(tether.pred_7) + (parseFloat(tether.observadores)*parseFloat(tether.pred_7)*0.01/100)).toFixed(2)}{"$"}</div>
            </div>
            <div id="conteiner-canvas">
              <div id={"conteiner-canvas2"+tether.c_moneda}>
                {graficoTether}
              </div>
            </div>
          </button>

          <button id="cripto1" onClick= {handleShowDogecoin}>
            <div className="detalles-criptomoneda">
              <div className="imagen"></div>
              <div className="detalle-criptomoneda">{dogecoin.c_moneda + " " +dogecoin.actual + "$"}</div>
            </div>
            <div className="evolucion">Evolución</div>
            <div className="porcentajes">
              <div className="porcentaje-1">Ultimo día: {dogecoin.p_1}</div>
              <div className="porcentaje-7">Ultimos 7 días: {dogecoin.p_7}</div>
            </div>
            <div className="predicciones">Predicciones a futuro</div>
            <div className="valores-predicciones">
              <div className="prediccion-1">A 1 día: {(parseFloat(dogecoin.pred_1) + (parseFloat(dogecoin.observadores)*parseFloat(dogecoin.pred_1)*0.01/100)).toFixed(2)}{"$"}</div>
              <div className="prediccion-7">A 7 días: {(parseFloat(dogecoin.pred_7) + (parseFloat(dogecoin.observadores)*parseFloat(dogecoin.pred_7)*0.01/100)).toFixed(2)}{"$"}</div>
            </div>
            <div id="conteiner-canvas">
              <div id={"conteiner-canvas2"+dogecoin.c_moneda}>
                {graficoDogecoin}
              </div>
            </div>
          </button>
          


        </div>

        
        



        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
              <div className="detalles-criptomoneda">
                <div className="imagen"></div>
                <div className="detalle-criptomoneda">{criptoActual.c_moneda + " " +criptoActual.actual + "$"}</div>
              </div>
          </Modal.Header>
          <Modal.Body>
            <div className="evolucion">Evolución</div>
            <div className="porcentajes">
              <div className="porcentaje-1">Ultimo día: {criptoActual.p_1}</div>
              <div className="porcentaje-7">Ultimos 7 días: {criptoActual.p_7}</div>
            </div>
            <div className="predicciones">Predicciones a futuro</div>
            <div className="valores-predicciones">
              <div className="prediccion-1">A 1 día: {
              ventanaActual ==="bitcoin" ? (parseFloat(criptomoneda.pred_1) + (parseFloat(criptomoneda.observadores)*parseFloat(criptomoneda.pred_1)*0.01/100)).toFixed(2):
              ventanaActual ==="ethereum" ? (parseFloat(ethereum.pred_1) + (parseFloat(ethereum.observadores)*parseFloat(ethereum.pred_1)*0.01/100)).toFixed(2):
              ventanaActual ==="tether" ? (parseFloat(tether.pred_1) + (parseFloat(tether.observadores)*parseFloat(tether.pred_1)*0.01/100)).toFixed(2):
              ventanaActual ==="dogecoin" && (parseFloat(dogecoin.pred_1) + (parseFloat(dogecoin.observadores)*parseFloat(dogecoin.pred_1)*0.01/100)).toFixed(2)
              }{"$"}</div>
              <div className="prediccion-7">A 7 días: {
                ventanaActual ==="bitcoin" ? (parseFloat(criptomoneda.pred_7) + (parseFloat(criptomoneda.observadores)*parseFloat(criptomoneda.pred_7)*0.001/100)).toFixed(2):
                ventanaActual ==="ethereum" ? (parseFloat(ethereum.pred_7) + (parseFloat(ethereum.observadores)*parseFloat(ethereum.pred_7)*0.001/100)).toFixed(2):
                ventanaActual ==="tether" ? (parseFloat(tether.pred_7) + (parseFloat(tether.observadores)*parseFloat(tether.pred_7)*0.001/100)).toFixed(2):
                ventanaActual ==="dogecoin" && (parseFloat(dogecoin.pred_7) + (parseFloat(dogecoin.observadores)*parseFloat(dogecoin.pred_7)*0.001/100)).toFixed(2)
              
              }{"$"}</div>
            </div>
            <div id="conteiner-canvas">
              <div id={"conteiner-canvas2"+criptoActual.c_moneda}>
                {graficoActual}
              </div>
            </div>
            <div id="conteiner-observadores">
              Hay {ventanaActual ==="bitcoin" ? criptomoneda.observadores === 1 ? criptomoneda.observadores + " usuario": criptomoneda.observadores + " usuarios": 
              ventanaActual ==="ethereum" ? ethereum.observadores === 1 ? ethereum.observadores + " usuario": ethereum.observadores + " usuarios": 
              ventanaActual ==="tether" ? tether.observadores === 1 ? tether.observadores + " usuario": tether.observadores + " usuarios": 
              ventanaActual ==="dogecoin" && dogecoin.observadores === 1 ? dogecoin.observadores + " usuario": dogecoin.observadores + " usuarios"
              } observando el {criptoActual.c_moneda}!
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick= {handleClose}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};
/*
function disparar(moneda){
  console.log("EjecutoFuncion");
  let grafico;
  if(moneda.c_moneda === "ETHEREUM"){
    grafico = graficoEthereum
  }
  else if(moneda.c_moneda === "TETHER"){
    grafico = graficoTether
  }
  else if(moneda.c_moneda === "DOGECOIN"){
    grafico = graficoDogecoin
  }
  else if(moneda.c_moneda === "CARDANO"){
    grafico = graficoDogecoin
  }
  return (
  <>
      <div id="cripto1">
            <div className="detalles-criptomoneda">
              <div className="imagen"></div>
              <div className="detalle-criptomoneda">{moneda.c_moneda + " " +moneda.actual }</div>
            </div>
            <div className="evolucion">Evolución</div>
            <div className="porcentajes">
              <div className="porcentaje-1">Ultimo día: {moneda.p_1}</div>
              <div className="porcentaje-7">Ultimos 7 días: {moneda.p_7}</div>
            </div>
            <div className="predicciones">Predicciones a futuro</div>
            <div className="valores-predicciones">
              <div className="prediccion-1">A 1 día: {moneda.pred_1}</div>
              <div className="prediccion-7">A 7 días: {moneda.pred_7}</div>
            </div>
            <div id="conteiner-canvas">
              <div id={"conteiner-canvas2"+moneda.c_moneda}>
                {grafico}
              </div>
            </div>
          </div>
  </>
  )
}
*/
export default Criptomonedas;

