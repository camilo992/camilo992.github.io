import React, {useState} from 'react';
import NavbarComp from './components/NavbarComp';
import {Routes,Route,BrowserRouter} from "react-router-dom";
import {Card, Container, Row, Col} from 'react-bootstrap';

//components
import About from "./components/About";
import Contact from './components/Contact';
import Home from './components/Home';
import Registro from './components/Registro';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import MakeMoney from './components/MakeMoney';
import SuperBonus from './components/SuperBonus';
import CustomerService from './components/CustomerService';
import InviteFriends from './components/InviteFriends';
import SessionHandler from './components/SessionHandler';

function App() {

  const [miclave, setMiClave] = useState('')

  const guardarClave = (clave) => {
    setMiClave(clave)
  }


  return (
    <BrowserRouter>
    <div className='App'>
      <NavbarComp/>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-xl-10 col-lg-12 col-md-9">
            <Card className='o-hidden -0 shadow-lg my-5'>
            <Routes>
              <Route path="/" element={<SessionHandler guardarClave={guardarClave} Component={<Home/>}/>}/>
              <Route path="/Registro" element={<Registro/>} />
              <Route path="/About" element={<About />} />
              <Route path="/Contact" element={<Contact />} />
              
              {/*ROUTES PROTECTED WITH SESSION MANAGEMENT*/}
              <Route path="/deposit" element={<SessionHandler guardarClave={guardarClave} Component={<Deposit/>}/>}/>
              <Route path="/withdraw" element={<SessionHandler guardarClave={guardarClave} Component={<Withdraw/>}/>}/>
              <Route path="/makemoney" element={<SessionHandler guardarClave={guardarClave} Component={<MakeMoney/>}/>}/>
              <Route path="/superbonus" element={<SessionHandler guardarClave={guardarClave} Component={<SuperBonus/>}/>}/>
              <Route path="/customerservice" element={<SessionHandler guardarClave={guardarClave} Component={<CustomerService/>}/>}/>
              <Route path="/invitefriends" element={<SessionHandler guardarClave={guardarClave} Component={<InviteFriends/>}/>}/>
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


