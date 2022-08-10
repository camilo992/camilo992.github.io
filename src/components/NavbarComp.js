import {Navbar,Nav,Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
import * as MySession from './mysession';

export default function NavbarComp () {

    function LogOut()  {
      MySession.LogOutUser()
      //forces re-render
      window.location.reload()
    }

    //builds sign in message
    var signInMessage = <div><a href="/">Sign in</a></div>
    if (MySession.IsThereSession()) {
      var dataLogedInUser = MySession.GetLogedInUserData()
      signInMessage = <div>Signed in as: <a href="/" onClick={LogOut}>{dataLogedInUser.Nombres}</a></div>
    }

 return (
  <Container>
  <Navbar bg="warning" expand="lg">
    <Container>
      <Navbar.Brand className="text-white" href="/">Taoke Camilo!
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link  to="/" as={Link}>Home</Nav.Link>
          <Nav.Link to="/registro" as={Link}>Join!</Nav.Link>
          <Nav.Link to="/about" as={Link}>About</Nav.Link>
          <Nav.Link to="/contact" as={Link}>Contact</Nav.Link>
        </Nav>
        </Navbar.Collapse>
        <Navbar.Text>
            {signInMessage}
        </Navbar.Text>
    </Container>
  </Navbar>
  
  </Container>
  )
}