import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {Form, Container, Row, Col, Modal, Image} from 'react-bootstrap';
import {UpdateLogedInUserData} from './mysession';
import * as myConstants from './constants';

//assets
import imageTreasure from '../images/image_treasure_splash_screen.jpg';

const Login = () => {

    const [data, setData] = useState({formValidated:false, showModalFirstTime:true})

    const closeModal = () => {
        //updates state to hide modal
        setData({...data, showModalFirstTime:false});
    }

    const NotwWorking = () => {
        //alerts that this is not working yet
        alert('We\'re working on this but right now it is not available')
    }

    const onChange = (e) => {
        //updates form data in state
        setData({...data, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        //activates validation format to show errors
        setData({...data, formValidated: true});
        
        if (form.checkValidity()) {
  
            //sends form to api
            const JSONdata = JSON.stringify(Object.fromEntries(new FormData(e.target)));
                       
            // API endpoint where we send form data.
            const endpoint = myConstants.API_URL + '/loginuser'
            console.log ('endpnt:' + endpoint)
        
            // Form the request for sending data to the server.
            const options = {
              // The method is POST because we are sending data.
              method: 'POST',
              // Tell the server we're sending JSON.            
              //headers: {
                    //'Content-Type': 'application/json',
              //},
              // Body of the request is the JSON data we created above.
              body: JSONdata,
            }
        
            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options)
        
            // Get the response data from server as JSON.
            // If server returns the name submitted, that means the form works.
            const result = await response.json();
            console.log('por aca voy...')

            //IF AN OBJECT ARRIVED CREATES SESSION
            if (result !== '{}') {

                //creates user session and reloads
                UpdateLogedInUserData(JSON.parse(result))
                window.location.reload()
    
            } else {
                //shows error message
                document.getElementById('cuerpo_forma').innerText = 'Mmm.. that didn\'t go well. Please try again..'
            }
          }
    }

    return (
              <div className="row justify-content-center">
                <ModalSplash show={data.showModalFirstTime} handleClose={closeModal}/>
                  <div className="col-lg-5 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-7">
                      <div className="p-5">
                          <div className="text-center" border="1">
                              <h1 className="h4 text-gray-900 mb-4" id="cuerpo_forma">Welcome Back!</h1>
                          </div>
                          <Form id="FormaRegistro" noValidate validated={data.formValidated} className="user" onSubmit={handleSubmit} method="POST">
                              <div className="form-group">
                              <Form.Control type="email" className="form-control-user" 
                                    id="Email"
                                    name="Email"
                                    defaultValue="pipas1@cusquie.com"
                                      placeholder="Email Address" onChange={onChange}
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
                                placeholder="Password" onChange={onChange}
                                title="Password must be at least 8 characters including one number and one letter" 
                                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                required
                                />
                            <Form.Control.Feedback type="invalid">Password must be at least 8 characters including one number and one letter</Form.Control.Feedback>
                              </div>
                              <button className="btn btn-primary btn-user btn-block">
                                  Login
                              </button>
                              <hr/>
                              <div  onClick={NotwWorking} className="btn btn-google btn-user btn-block">
                                  <i className="fab fa-google fa-fw"></i>Login with Google
                              </div>
                              <div  onClick={NotwWorking} className="btn btn-facebook btn-user btn-block">
                                  <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                              </div>
                          </Form>
                          <hr/>
                          <div className="text-center">
                            <Link className="small" to="#" onClick={NotwWorking}>Forgot Password?</Link>
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
      <> 
        <Modal show={props.show} onHide={props.handleClose} animation={true} fullscreen={true} size='md' onClick={props.handleClose}>
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
  
export default Login;