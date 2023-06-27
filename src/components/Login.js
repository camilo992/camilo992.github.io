import React, {useState} from 'react'
import { GoogleLogin} from '@react-oauth/google';
import jwtDecode from 'jwt-decode'
import {Link} from 'react-router-dom';
import {Form, Container, Row, Col, Modal, Image} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {LoginUserThunk} from './utils/userSlice';
import {LoginUserThunkFromTokenGoogle} from './utils/userSlice';

//assets
import imageFantasyBankCouple from '../images/image_fantasy_bank_splash_screen_couple.jpg';



const Login = () => {
  console.log('**RENDER LOGIN..')

  const [data, setData] = useState({formValidated:false, showModalFirstTime:false})
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.user.status)
  const loginStatusError = useSelector(state => state.user.error)

  const closeModal = () => {
      //updates state to hide modal
      setData({...data, showModalFirstTime:false});
  }
  const LoginWithGoogle = (credentialResponse) => {
    // Load the Google Sign-In API
    console.log('***LOGIN WIUTH GOOGLE')
    console.log(credentialResponse);
    const USER_CREDENTIAL = jwtDecode(credentialResponse.credential);
    console.log(USER_CREDENTIAL);    
    //sends form to api
    try {
      dispatch(LoginUserThunkFromTokenGoogle(credentialResponse)).unwrap()
    }
    catch (err) {
      console.error('Failed to login user: ', err)
    }    
  }      

  const LoginWithGoogleError = (credentialResponse) => {
      // Load the Google Sign-In API
      console.log('***LOGIN WIUTH GOOGLE!! ERROR')
      console.log(credentialResponse);
  }      
  
  const onChange = (e) => {
      //updates form data in state
      setData({...data, [e.target.id]: e.target.value});
  }

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    //activates validation format to show errors
    console.log('handle sbmit!')
    setData({...data, formValidated: true});
      
    if (!form.checkValidity()) 
      return;

    //sends form to api
    const JSONdata = JSON.stringify(Object.fromEntries(new FormData(e.target)));
    try {
      dispatch(LoginUserThunk(JSONdata)).unwrap()
    }
    catch (err) {
      console.error('Failed to login user: ', err)
    }
  }

  var strUserMessage = 'Welcome back! Please login:'
  switch (loginStatus) {
    case 'loading': {
      strUserMessage = 'Please wait. I\'m working on this'
      break;
    }
    case 'failed': {

      if (loginStatusError === 'invalid or expired token!')
        //failed becaue it was trying to login from token and the token is expired or invalid.
        strUserMessage = 'Your previous session expired. Please log in again'
      else if (loginStatusError === 'Server is down:TypeError: Failed to fetch')
        //failed becaue it was trying to login with a wrong user/password combination
        strUserMessage = 'Ooops, i could not reach our server. Please try again later.'
      else
        strUserMessage = loginStatusError
      break;
    }
    default: {
      break;
    }

  }
  return (
              <div className="row justify-content-center">
                
                <ModalSplash show={data.showModalFirstTime} handleClose={closeModal}/>
                  <div className="col-lg-5 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-7">
                      <div className="p-5">
                          <div className="text-center">
                              <h1 className="h4 text-gray-900 mb-4" id="cuerpo_forma">{strUserMessage}</h1>
                          </div>
                          <Form id="FormaRegistro" noValidate validated={data.formValidated} className="user" onSubmit={handleSubmit} method="POST">
                              <div className="form-group">
                              <Form.Control type="email" className="form-control-user" 
                                    id="Email"
                                    name="Email"
                                    defaultValue="pipas1@cusquie.com"
                                      placeholder="email address" onChange={onChange}
                                      title="Please write a valid email address" 
                                      required
                                  />
                                  <Form.Control.Feedback type="invalid">Please write a valid email address</Form.Control.Feedback>
                              </div>
                              <div className="form-group">
                              <Form.Control type="password" className="form-control form-control-user"
                                id="Password" 
                                name="Password" 
                                defaultValue="1acamilo"
                                placeholder="password" onChange={onChange}
                                title="Password must be at least 8 characters including one number and one letter" 
                                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                required
                                />
                            <Form.Control.Feedback type="invalid">Password must be at least 8 characters including one number and one letter</Form.Control.Feedback>
                              </div>
                              <div className="d-flex justify-content-center">
                                <button className="btn btn-primary btn-user btn-block " style={{"maxWidth": "266px"}}>Login</button>
                              </div>
                              <hr/>
                              <div className='d-flex justify-content-center'>
                                <GoogleLogin className="btn" onSuccess={LoginWithGoogle} onError ={LoginWithGoogleError} type="standard" theme="filled_blue" shape="circle" />
                              </div>
                          </Form>
                          <hr/>
                          <div className="text-center">
                            <Link className="small" to="#" onClick={LoginWithGoogle}>Forgot Password?</Link>
                          </div>
                          <div className="text-center">
                              <Link className="small" to="/registro">Create an Account!</Link>
                          </div>
                      </div>
                  </div>
              </div>
      );
}

function ModalSplash(props) {
    
    return (
        <Modal show={props.show} onHide={props.handleClose} animation={true} fullscreen={true} size='md' onClick={props.handleClose}>
          <Modal.Body>
            <Container className='text-center '>
              <Col className='align-items-center'>
                <Row className=''><div className='h2 text-center text-primary'>Welcome to Fantasy Bank!!</div></Row>
                <Row className=''>
                    <div className='h4 text-center'>Earn unlimited interest using our app!!</div>
                </Row>
                <Row className=''>
                  <Col className=''><Image src={imageFantasyBankCouple} width="50%" height="50%" fluid/></Col>
                </Row>               
                <Row className=''>
                <div className='h1 text-center text-danger'>Join Today!</div>
                </Row>
                
              </Col>
            </Container>
          </Modal.Body>
        </Modal>
    );
  }
  
export default Login;