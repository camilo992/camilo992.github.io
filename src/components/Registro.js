import React, {useState} from 'react'
import {Form} from 'react-bootstrap';
import * as myConstants from './constants';
import { Link } from 'react-router-dom';

const Registro = () => {

    const [data, setData] = useState({formValidated:false})
    console.log(data)

    const NotwWorking = () => {
        //alerts that this is not working yet
        alert('We\'re working on this but right now it is not available')
    }


    const onChange = (e) => {
        const miform = e.currentTarget.form;
        
        //ACTUALIZA EL ESTADO
        setData({...data, [e.target.id]: e.target.value});

        //SI LA FORMAESTA EN MODO VALIDACION
        if (data.formValidated === true) {
            //SI LAS CLAVES NO COINCIDEN
            if (miform.Password.value !== miform.RepeatPassword.value) {          
                //ENCIENDE MENSAJE ERROR DE CINFIRMACION PASSWORD
                miform.RepeatPassword.setCustomValidity("error");
            }
            else {
                //SI COINCIDEN, BAJAR ERROR
                miform.RepeatPassword.setCustomValidity("");
            }

    }
    }

    const handleSubmit = async (e) => {
        const form = e.currentTarget;

        // ACTIVAMOS VALIDATION FORMAT PARA MOSTRAR LOS ERRORES
        setData({...data, formValidated: true});
        
        //SI LA FORMA NO ES OK
        if (form.checkValidity() === false) {

            e.preventDefault();
            e.stopPropagation();
        }
        else {

            //ENVIAMOS LA FORMA
            e.preventDefault();
            
            //TOMA LA DATA DE LA FORMA Y LA VUELVE OBJETO JSON
            var JSONdata = JSON.parse(JSON.stringify(Object.fromEntries(new FormData(e.target))));
            
            //ADDDS ACCOUNT BALANCE & PROFITS
            JSONdata.Balance = 0;
            JSONdata.AcumProfits = 0;
            JSONdata.PromotionBonus = 0;
            JSONdata.TodaysProfits = 0;
            JSONdata = JSON.stringify(JSONdata);
      
            // API endpoint where we send form data.
            const endpoint =myConstants.API_URL + '/adduser'
        
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
            console.log('endpoint:' + endpoint)
            console.log('options:' + JSON.stringify(options))
    
            const response = await fetch(endpoint, options)
        
            // Get the response data from server as JSON.
            // If server returns the name submitted, that means the form works.
            const result = await response.json()

            //SI SE REGISTRR OK
            if (result.Respuesta === 'OK') {

                //ESCONDE LA FORMA
                document.getElementById("FormaRegistro").remove();
                
                //MUESTRA MENSAJE DE EXITO
                document.getElementById('cuerpo_forma').innerText = 'Your account was created successfully!'  
    
            } else {
                //MUESTRA MENSAJE DE EXITO
                document.getElementById('cuerpo_forma').innerText = 'Something went wrong, please try again..'
            }
            

          }

            console.log("listo!")        

        
    }


    return (

              <div className="row">
                  <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                  <div className="col-lg-7">
                      <div className="p-5">
                          <div className="text-center" border="1">
                              <h1 className="h4 text-gray-900 mb-4" id="cuerpo_forma">Create an Account!</h1>
                          </div>
                          <Form id="FormaRegistro" noValidate validated={data.formValidated} className="user" onSubmit={handleSubmit}  method="POST">
                              <Form.Group className="form-group row">
                                  <div className="col-sm-6 mb-3 mb-sm-0">
                                      <Form.Control type="text" className="form-control-user"
                                          name="Nombres"
                                          id="Nombres"
                                          //defaultvalue="Camilo"
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
                                          //defaultvalue="Arango"
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
                                      //defaultvalue="1976-08-01"
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
                                      //defaultvalue="pipas@cusquie.com"
                                      placeholder="Email Address" onChange={onChange}
                                      title="Please write a valid email address" 
                                      required
                                  />
                                  <Form.Control.Feedback type="invalid">Please write a valid email address</Form.Control.Feedback>
                              </div>
                              <div className="form-group row">
                                  <div className="col-sm-6 mb-3 mb-sm-0">
                                      <Form.Control type="password" className="form-control form-control-user"
                                         //defaultvalue="1acamilo"
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
                                      //defaultvalue="1acamilo"
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

export default Registro;