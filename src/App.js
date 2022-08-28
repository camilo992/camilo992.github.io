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

  const [data, setData] = useState(0)
  
  
  
  const RerenderApp = () => {
    //forces re-render of full app by changing state data
    setData(data+1);
  }

  return (
    <BrowserRouter>
    <div className='App'>
    <NavbarComp RerenderApp={RerenderApp}/>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-xl-10 col-lg-12 col-md-9">
            <Card className='o-hidden -0 shadow-lg my-5'>
            <Routes>
                <Route path="/" element={<SessionHandler RerenderApp={RerenderApp} Component={<Home/>}/>}/>
                <Route path="/registro" element={<Registro/>} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              
                {/*ROUTES PROTECTED WITH SESSION MANAGEMENT*/}
                <Route path="/home" element={<SessionHandler Component={<Home/>}/>}/>
                <Route path="/deposit" element={<SessionHandler Component={<Deposit/>}/>}/>
                <Route path="/withdraw" element={<SessionHandler Component={<Withdraw/>}/>}/>
                <Route path="/makemoney" element={<SessionHandler Component={<MakeMoney/>}/>}/>
                <Route path="/superbonus" element={<SessionHandler Component={<SuperBonus/>}/>}/>
                <Route path="/customerservice" element={<SessionHandler Component={<CustomerService/>}/>}/>
                <Route path="/invitefriends" element={<SessionHandler Component={<InviteFriends/>}/>}/>
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


