import React, {useState} from 'react'
import {Form} from 'react-bootstrap';
import * as myConstants from './constants';
import { Link } from 'react-router-dom';

const Register = () => {

    const [data, setData] = useState({formValidated:false})

    const NotwWorking = () => {
        //alerts that this is not working yet
        alert('We\'re working on this but right now it is not available')
    }


    const onChange = (e) => {
        const miform = e.currentTarget.form;
        
        //updates form data in state
        setData({...data, [e.target.id]: e.target.value});

        if (data.formValidated) {
            if (miform.Password.value !== miform.RepeatPassword.value)
                //confirmation pasword doesn not match
                miform.RepeatPassword.setCustomValidity("error");
            else
                //conirmation OK, set form as valid
                miform.RepeatPassword.setCustomValidity("");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;

        //activates validation format to show errors
        setData({...data, formValidated: true});
        
        if (form.checkValidity()) {

            var JSONdata = JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.target))));
            //adds additional fields for user
            JSONdata.Balance = 0;
            JSONdata.AcumProfits = 0;
            JSONdata.PromotionBonus = 0;
            JSONdata.TodaysProfits = 0;
            JSONdata = JSON.stringify(JSONdata);
      
            const endpoint =myConstants.config.API_URL + '/adduser'
            const options = {
              method: 'POST',
              body: JSONdata,
            } 

            fetch(endpoint, options)  
            .then(function(response) {
                if(response.status === 200)
                  return response.json();
              throw new Error('Server is down or not responding ' + response.status);
            })
            .then(function(data) {
                //verifies operation result
                var strMsg
                data = JSON.parse(data)
                if (data.error) {
                    strMsg  = 'Your account was created successfully!'
                    document.getElementById("FormRegister").remove();
                }
                else
                    strMsg = data.error
                document.getElementById('cuerpo_forma').innerText = strMsg
            })
        }       
    }


    return (

              <div className="row">
                  <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                  <div className="col-lg-7">
                      <div className="p-5">
                          <div className="text-center" border="1">
                              <h1 className="h4 text-gray-900 mb-4" id="cuerpo_forma">Create an Account!</h1>
                          </div>
                          <Form id="FormRegister" noValidate validated={data.formValidated} className="user" onSubmit={handleSubmit}  method="POST">
                              <Form.Group className="form-group row">
                                  <div className="col-sm-6 mb-3 mb-sm-0">
                                      <Form.Control type="text" className="form-control-user"
                                          name="Nombres"
                                          id="Nombres"
                                          defaultValue="Camilo"
                                          placeholder="Name"
                                          onChange={onChange}
                                          title="Name must have at least 2 characters and should not have any special characters " 
                                          pattern="^[a-zA-Z0-9]{2,25}$" 
                                          required
                                          />
                                        <Form.Control.Feedback type="invalid">Name must have at least 2 characters and should not have any special characters </Form.Control.Feedback>
                                 </div>
                                  <div className="col-sm-6">
                                      <Form.Control type="text" className="form-control-user"
                                        name="Apellidos"
                                          id="Apellidos"
                                          defaultValue="Arango"
                                          placeholder="Last name"
                                          onChange={onChange}
                                          title="Last name must have at least 2 characters and should not have any special characters " 
                                          pattern="^[a-zA-Z0-9]{2,25}$" 
                                          required
                                        />
                                        <Form.Control.Feedback type="invalid">Last name must have at least 2 characters and should not have any special characters </Form.Control.Feedback>
                                  </div>
                              </Form.Group>
                              <div className="form-group">
                                  <Form.Control type="date" className="form-control-user"
                                     id="Fecha"
                                     name = "Fecha"
                                      defaultValue="1976-08-01"
                                      placeholder="1976-08-01"
                                      onChange={onChange}
                                      title="Please select a date" 
                                      required
                                    />
                                    <Form.Control.Feedback type="invalid">Please select a date</Form.Control.Feedback>
                              </div>
                              <div className="form-group">
                                  <Form.Control type="email" className="form-control-user" 
                                    id="Email"
                                    name="Email"
                                      defaultValue="pipas@cusquie.com"
                                      placeholder="Email Address" onChange={onChange}
                                      title="Please write a valid email address" 
                                      required
                                  />
                                  <Form.Control.Feedback type="invalid">Please write a valid email address</Form.Control.Feedback>
                              </div>
                              <div className="form-group row">
                                  <div className="col-sm-6 mb-3 mb-sm-0">
                                      <Form.Control type="password" className="form-control form-control-user"
                                         defaultValue="1acamilo"
                                          id="Password" 
                                          name="Password" 
                                          placeholder="Password" onChange={onChange}
                                          title="Password must have at least 8 characters, one letter and one number" 
                                          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                          required
                                        />
                                        <Form.Control.Feedback type="invalid">Password must have at least 8 characters, one letter and one number</Form.Control.Feedback>
                                  </div>
                                  <div className="col-sm-6">
                                      <Form.Control type="password" className="form-control form-control-user"
                                      defaultValue="1acamilo"
                                      name="RepeatPassword"
                                          id="RepeatPassword" placeholder="Repeat Password" onChange={onChange}
                                        title="Password and password confiration should match" 
                                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                          required
                                        />
                                        <Form.Control.Feedback type="invalid">Password and password confirmation should match</Form.Control.Feedback>
                                  </div>
                              </div>
                              <button className="btn btn-primary btn-user btn-block">
                                  Register Account
                              </button>
                              <hr/>
                              <div  onClick={NotwWorking} className="btn btn-google btn-user btn-block">
                                  <i className="fab fa-google fa-fw"></i> Register with Google
                              </div>
                              <div onClick={NotwWorking} className="btn btn-facebook btn-user btn-block">
                                  <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                              </div>
                          </Form>
                          <hr/>
                          <div className="text-center">
                            <Link className="small" to="#" onClick={NotwWorking}>Forgot Password?</Link>
                          </div>
                          <div className="text-center">
                                <Link className="small" to="/">Already have an account? Login!</Link>
                          </div>
                      </div>
                  </div>
              </div>
    )
}

export default Register;