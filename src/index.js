import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>    
    <App />             
  </React.StrictMode>
);  

//Parte 1 donde se ejecuta el servidor en local con archivo db.json ejecutando con npm run server en este mismo directorio