import {Navbar,Nav,Container} from 'react-bootstrap';
import {Link, Outlet} from "react-router-dom";
import * as MySession from './mysession';

export default function NavbarComp (props) {
    console.log('**EN NAVBARCOMP.. ')
    var User = props.User

    function LogOut()  {
      MySession.DeleteToken()
      //re-renders app complete
      props.RerenderApp();
    }

    //builds sign in message
    var signInMessage = <div><Link to="/">Sign in</Link></div>
    if (User)
      signInMessage = <div>Signed in as: <Link to="/" onClick={LogOut}>{User.Nombres}</Link></div>

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
  <Outlet/>
  
  </Container>
  )
}