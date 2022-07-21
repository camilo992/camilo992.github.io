import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/sb-admin-2.scss'; /*BOOTSTRAP PERSONALIZATION'*/
import './css/sb-admin-2.min.css'; /*'PERSONALIZATION DEL TEMA CHOREADO*/
import './css/all.min.css'; /*'PERSONALIZATION DEL TEMA CHOREADO*/
import {Button, Card, Container, Row, Col} from 'react-bootstrap';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Container className="border">
      <Row className='justify-content-center'>
        <div className='col-xl-10 col-lg-12 col-md-9'>
          <Card className='card o-hidden border-0 shadow-lg my-5'>
            <Card.Title>Hola mundo My Card</Card.Title>
            Hola mundo My Card
          </Card>
        </div> 
      </Row>
    </Container>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
