import {Navbar,Nav, Image} from 'react-bootstrap';
import {Link} from "react-router-dom";
import * as MySession from './utils/mysession';
import {useDispatch, useSelector} from 'react-redux';
import {LogoutUser} from './utils/userSlice';
import LogoFantasyBank from '../images/image_fantasy_bank_logo.jpg';

export default function NavbarComp () {
  console.log('**EN NAVBARCOMP.. ')
  var dispatch = useDispatch()
  var User = useSelector(state => state.user.user)

  function LogOut()  {
    console.log('loggin out...')
    MySession.DeleteToken()
    //re-renders app complete
    dispatch(LogoutUser())
  }

    //builds sign in message
    var signInMessage = <div><Link to="/" className="text-white">Sign in</Link></div>
    if (User)
      signInMessage = <div className="text-white">Signed in as: <Link to="/" className="text-white" onClick={LogOut}>{User.Nombres}</Link></div>

 return (
  <Navbar bg="primary" expand="lg">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Brand className="text-white" href="/">
    <Image src={LogoFantasyBank} width="145" height="43"/>
      </Navbar.Brand>
    
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link className="text-white" to="/" as={Link}>Home</Nav.Link>
        <Nav.Link className="text-white" to="/registro" as={Link}>Join!</Nav.Link>
        <Nav.Link className="text-white" to="/about" as={Link}>About</Nav.Link>
        <Nav.Link className="text-white" to="/contact" as={Link}>Contact</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    <Navbar.Text>
        {signInMessage}
    </Navbar.Text>
  </Navbar>
  )
}