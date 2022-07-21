import {Navbar,Nav,Container} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default function NavbarComp (props) {


    //TRAE USUARIO DE LOCALSTRGE SI EXISTE
    var dataUsuarioLogged = localStorage.getItem("user") == null ? '{}':JSON.parse(localStorage.getItem("user"));

    function LogOutUser()  {
      localStorage.removeItem('user');
      //FORCES RE-RENDER
      window.location.reload()
    }

    //SI HAY SESION
    var LoggedUser
    if (dataUsuarioLogged !== '{}')
      LoggedUser = <div>Signed in as: <a href="/" onClick={LogOutUser}>{dataUsuarioLogged.Nombres}</a></div>
    else
      LoggedUser = <div><a href="/">Sign in</a></div>

      
  

 return (
  <Container>
  <Navbar bg="warning" expand="lg">
    <Container>
      <Navbar.Brand href="/">Taoke Camilo!</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link  to="/" as={Link}>Home</Nav.Link>
          <Nav.Link to="/registro" as={Link}>Unete!</Nav.Link>
          <Nav.Link to="/about" as={Link}>About</Nav.Link>
          <Nav.Link to="/contact" as={Link}>Contact</Nav.Link>
        </Nav>
        </Navbar.Collapse>
        <Navbar.Text>
            {LoggedUser}
        </Navbar.Text>
    </Container>
  </Navbar>
  
  </Container>
  )
}