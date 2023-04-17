import React from 'react'
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './scss/sb-admin-2.scss'; /*BOOTSTRAP PERSONALIZATION'*/
//import './css/sb-admin-2.min.css'; /*'PERSONALIZATION DEL TEMA CHOREADO*/
import App from './App';

//REDUX 
import store from './components/utils/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
/*<React.StrictMode>
  </React.StrictMode>*/

root.render(
  <GoogleOAuthProvider clientId="1038408980220-a7dfih0lmem773bfgj008pegag4tiopo.apps.googleusercontent.com">
    <Provider store={store}>
      <App/>
    </Provider>  
  </GoogleOAuthProvider>
);