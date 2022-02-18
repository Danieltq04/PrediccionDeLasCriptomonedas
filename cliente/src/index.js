import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Criptomonedas from './componentes/Criptomonedas';
//import LineChart from './componentes/LineChart';


/*
ReactDOM.render(
  <React.StrictMode>
    <Criptomonedas />
  </React.StrictMode>,
  document.getElementById('root')
);*/
ReactDOM.render( <Criptomonedas />  , document.getElementById('root') );

/*
ReactDOM.render(
  <React.StrictMode>
    <LineChart /> 
  </React.StrictMode>
 , document.getElementById('conteiner-canvas') );*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

