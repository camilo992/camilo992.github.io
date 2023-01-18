import React, {useState} from 'react';
import NavbarComp from './components/NavbarComp';
import {Routes,Route,BrowserRouter} from "react-router-dom";
import {Card, Container, Row, Col} from 'react-bootstrap';
import * as MySession from './components/mysession';
import * as myConstants from './components/constants';

//components
import About from "./components/About";
import Contact from './components/Contact';
import Home from './components/Home';
import Register from './components/Register';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import MakeMoney from './components/MakeMoney';
import SuperBonus from './components/SuperBonus';
import CustomerService from './components/CustomerService';
import InviteFriends from './components/InviteFriends';
import SessionHandler from './components/SessionHandler';


  function App() {
    console.log('rendring app..')
    const [data, setData] = useState({tokenValidated:false,tokenValid:false,appReloadCounter:0})
    var User;
    var token;
    var tokenValid = false
    
    const CheckTokenWithServer = async () => {
      //test token with server
      console.log('running CheckTokenWithServer..')    
      const endpoint = myConstants.config.API_URL + '/checktoken'
      const options = {
          method: 'POST',
          body: JSON.stringify(token),
      } 
     
      return await fetch(endpoint, options).then(response => {
        console.log('listo para return json')
        return response.json();
      })
      .then(data =>  {
        console.log('dentro de .then(data => ')
        if (data === 'false') {
          //token validated, token invalid  
          console.log('token validated but  **INVALID**!. reloading. pipas: '+ data)
          MySession.DeleteToken()
          alert('your session expired. Please login again')
          tokenValid = false;
        } 
        else {
          //token validated, token valid!
          tokenValid = true;
          console.log('token validated and **VALID**!. reloading. pipas: '+ data)
          //stores refreshed token
          MySession.StoreToken(JSON.parse(data))
        }
        RerenderApp(true, tokenValid)
      })
    }

    const RerenderApp = (tokenValidated, tokenValid) => {
      //forces re-render of full app by changing state data
      console.log('En RerenderApp..')
      var counter = data.appReloadCounter;
      counter++;
      setData({tokenValidated:tokenValidated, tokenValid:tokenValid, appReloadCounter:counter});
    }
  
    
    if (!data.tokenValidated) {
      //token not validated
      token = MySession.GetToken()
      if (token) {
        //there is a token stored, validate it with server
        console.log('si hay token, validar com server.. ')  
        CheckTokenWithServer()
      }
      else {
        //no token stored  token, reload..
        console.log('no hay token. reload..')
        RerenderApp(true, false)
      }
    }
    else {
      //token validated if token valid, load User
      if (data.tokenValid) {
        console.log('in app(): token validated and token valid. loading User..')
        User = MySession.GetUserDatafromToken()
      }
    }
    console.log('a punto derender app()..appReloadCounter: ' + data.appReloadCounter)
    return (
      <BrowserRouter>
      <div className='App'>
      <NavbarComp RerenderApp={RerenderApp} User={User}/>
        <Container>
          <Row className="justify-content-center">
            <Col className="col-xl-10 col-lg-12 col-md-9">
              <Card className='o-hidden -0 shadow-lg my-5'>
              <Routes>
                  <Route path="/" element={<SessionHandler RerenderApp={RerenderApp} User={User} Component={<Home/>}/>}/>
                  <Route path="/registro" element={<Register/>} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                
                  {/*ROUTES PROTECTED WITH SESSION MANAGEMENT*/}
                  <Route path="/home" element={<SessionHandler RerenderApp={RerenderApp} User={User} Component={<Home/>}/>}/>
                  <Route path="/deposit" element={<SessionHandler RerenderApp={RerenderApp} User={User} Component={<Deposit RerenderApp={RerenderApp}/>}/>}/>
                  <Route path="/withdraw" element={<SessionHandler RerenderApp={RerenderApp} User={User} Component={<Withdraw/>}/>}/>
                  <Route path="/makemoney" element={<SessionHandler RerenderApp={RerenderApp} User={User} Component={<MakeMoney RerenderApp={RerenderApp}/>}/>}/>
                  <Route path="/superbonus" element={<SessionHandler RerenderApp={RerenderApp} User={User} Component={<SuperBonus/>}/>}/>
                  <Route path="/customerservice" element={<SessionHandler RerenderApp={RerenderApp} User={User} Component={<CustomerService/>}/>}/>
                  <Route path="/invitefriends" element={<SessionHandler RerenderApp={RerenderApp} User={User} Component={<InviteFriends/>}/>}/>
              </Routes>
              </Card>
            </Col>            
          </Row>
      </Container>
      </div>
      </BrowserRouter>
  
    );
 }
export default App;


