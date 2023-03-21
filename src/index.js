import React from 'react'
import ReactDOM from 'react-dom/client';
import './scss/sb-admin-2.scss'; /*BOOTSTRAP PERSONALIZATION'*/
import './css/sb-admin-2.min.css'; /*'PERSONALIZATION DEL TEMA CHOREADO*/
import './css/all.min.css'; /*'PERSONALIZATION DEL TEMA CHOREADO*/
import App from './App';

//REDUX 
import store from './components/utils/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
/*<React.StrictMode>
  </React.StrictMode>*/

root.render(
    <Provider store={store}>
      <App/>
    </Provider>  
);