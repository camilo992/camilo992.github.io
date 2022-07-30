import {useState} from 'react'
import './App.css';
import NavbarComp from './components/NavbarComp';
import {Routes,Route,BrowserRouter} from "react-router-dom";
import {Card, Container, Row, Col, Modal, Image} from 'react-bootstrap';

//COMPONENTS
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

//ASSETS
import imageTreasure from './images/image_treasure_splash_screen.jpg';



function App() {

  //if there is a session created, then splash screen won't show
  var dataUsuarioLogged = localStorage.getItem("user") == null ? '{}':JSON.parse(localStorage.getItem("user"));

  var ShowModal = {showModalFirstTime:true  };
  if (dataUsuarioLogged !== '{}') {
    console.log('no mostrar mdal')
    ShowModal = {showModalFirstTime:false}
  }

  const [data, setData] = useState(ShowModal)

  const closeModal = () => {
        
    //ACTUALIZA EL ESTADO
    console.log('cerrando modal')
    setData({...data, showModalFirstTime:false});
    
  }
   
    function LogOutUser()  {
      localStorage.removeItem('user');
      window.location.reload();
    }

  return (
    <BrowserRouter>
    <div className='App'>
    <ModalSplash show={data.showModalFirstTime} cerrar={closeModal}/>
      <NavbarComp LogOutUser={LogOutUser}/>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-xl-10 col-lg-12 col-md-9">
            <Card className='o-hidden -0 shadow-lg my-5'>
            <Routes>
              <Route path="/" element={<SessionHandler Component={<Home/>}/>}/>
              <Route path="/Registro" element={<Registro/>} />
              <Route path="/About" element={<About />} />
              <Route path="/Contact" element={<Contact />} />
              
              {/*ROUTES PROTECTED WITH SESSION MANAGEMENT*/}
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

function ModalSplash(props) {
    
  

  const handleClose = (algo) => props.cerrar(algo);

  return (
    <> 
      <Modal show={props.show} onHide={handleClose} animation={true} fullscreen={true} size='md' onClick={handleClose}>
        <Modal.Body>
          <Container className='text-center '>
            <Col className='align-items-center'>
              <Row className=''><div className='h2 text-center text-primary'>Welcome to Taoke Camilo!!</div></Row>
              <Row className=''>
                <Col className=''><Image src={imageTreasure} width="50%" height="50%" fluid/></Col></Row>
              <Row className=''>
                  <div className='h4 text-center'>"It's like Taoke Order, but better!!"</div>
              </Row>
              <Row className=''>
              <div className='h5 text-center'>Make money and never get lucky orders!!</div>
              </Row>
              <Row className=''>
              <div className='h1 text-center text-danger'>Join Today!</div>
              </Row>
              
            </Col>
          </Container>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}


