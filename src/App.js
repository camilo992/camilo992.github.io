import React  from 'react';
import NavbarComp from './components/NavbarComp';
import {Routes,Route,BrowserRouter} from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap';
import * as MySession from './components/utils/mysession';
import { useDispatch, useSelector } from 'react-redux';
import {LoginUserThunkFromToken} from './components/utils/userSlice';

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
  var token = useSelector(state => state.token)
  var User = useSelector(state => state.user)
  var dispatch = useDispatch()
    
  if (!User.user && User.status !== 'loading') {
    console.log('no hay User, mirar si ha token..')
    token = MySession.GetToken()
  
    if (token) {
      try {
        //there is a token stored, validate it with server
        console.log('hay token, vamos a logearnos..')
        dispatch(LoginUserThunkFromToken(token)).unwrap()
      }
      catch (err) {
        console.error('Failed to login user from token: ', err)
      }
    }
  }

  console.log('a punto return app()..')

  return (
    <BrowserRouter>
    <NavbarComp/>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-xl-10 col-lg-12 col-md-9">
            
            <Routes>
                <Route path="/" element={<SessionHandler Component={<Home/>}/>}/>
                <Route path="/registro" element={<Register/>} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              
                {/*ROUTES PROTECTED WITH SESSION MANAGEMENT*/}
                <Route path="/home" element={<SessionHandler Component={<Home/>}/>}/>
                <Route path="/deposit" element={<SessionHandler Component={<Deposit/>}/>}/>
                <Route path="/withdraw" element={<SessionHandler Component={<Withdraw />}/>}/>
                <Route path="/makemoney" element={<SessionHandler Component={<MakeMoney/>}/>}/>
                <Route path="/superbonus" element={<SessionHandler Component={<SuperBonus/>}/>}/>
                <Route path="/customerservice" element={<SessionHandler Component={<CustomerService/>}/>}/>
                <Route path="/invitefriends" element={<SessionHandler Component={<InviteFriends/>}/>}/>
            </Routes>
          </Col>            
        </Row>
    </Container>
    </BrowserRouter>
  );
  //}
//  else {
  //  return (<div>Pipaassssss</div>)
  //}
}
export default App;


