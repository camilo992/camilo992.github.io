import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/sb-admin-2.scss'; /*BOOTSTRAP PERSONALIZATION'*/
import './css/sb-admin-2.min.css'; /*'PERSONALIZATION DEL TEMA CHOREADO*/
import './css/all.min.css'; /*'PERSONALIZATION DEL TEMA CHOREADO*/
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*<React.StrictMode>*/
  <App/>
/*</React.StrictMode>*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
