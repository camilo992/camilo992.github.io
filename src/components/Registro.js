import React, {useState} from 'react'
import {Form} from 'react-bootstrap';
import * as myConstants from './constants';

const Registro = () => {

    const [data, setData] = useState({formValidated:false})
    console.log(data)

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
                //document.getElementById("FormaRegistro").remove();
                
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
                                          value="Camilo"
                                          placeholder="Nombres"
                                          onChange={onChange}
                                          title="El nombre debe teber al menos 2 caracteres y no tener caracteres especiales" 
                                          pattern="^[a-zA-Z0-9]{2,25}$" 
                                          required
                                          />
                                        <Form.Control.Feedback type="invalid">El nombre debe teber al menos 2 caracteres y no tener caracteres especiales</Form.Control.Feedback>
                                 </div>
                                  <div className="col-sm-6">
                                      <Form.Control type="text" className="form-control-user"
                                        name="Apellidos"
                                          id="Apellidos"
                                          value="Arango"
                                          placeholder="Apellidos"
                                          onChange={onChange}
                                          title="El apellido debe teber al menos 2 caracteres y no tener caracteres especiales" 
                                          pattern="^[a-zA-Z0-9]{2,25}$" 
                                          required
                                        />
                                        <Form.Control.Feedback type="invalid">El apellido debe teber al menos 2 caracteres y no tener caracteres especiales</Form.Control.Feedback>
                                  </div>
                              </Form.Group>
                              <div className="form-group">
                                  <Form.Control type="date" className="form-control-user"
                                     id="Fecha"
                                     name = "Fecha"
                                      value="1976-08-01"
                                      placeholder="01/01/2020"
                                      onChange={onChange}
                                      title="Por favor seleccione una fecha" 
                                      required
                                    />
                                    <Form.Control.Feedback type="invalid">Por favor seleccione una fecha</Form.Control.Feedback>
                              </div>
                              <div className="form-group">
                                  <Form.Control type="email" className="form-control-user" 
                                    id="Email"
                                    name="Email"
                                      value="pipas@cusquie.com"
                                      placeholder="Email Address" onChange={onChange}
                                      title="Escriba un email válido" 
                                      required
                                  />
                                  <Form.Control.Feedback type="invalid">Escriba un email válido</Form.Control.Feedback>
                              </div>
                              <div className="form-group row">
                                  <div className="col-sm-6 mb-3 mb-sm-0">
                                      <Form.Control type="password" className="form-control form-control-user"
                                         value="1acamilo"
                                          id="Password" 
                                          name="Password" 
                                          placeholder="Password" onChange={onChange}
                                          title="El password debe teber al menos 8 caracteres, una letra y un número" 
                                          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                          required
                                        />
                                        <Form.Control.Feedback type="invalid">El password debe teber al menos 8 caracteres, una letra y un número</Form.Control.Feedback>
                                  </div>
                                  <div className="col-sm-6">
                                      <Form.Control type="password" className="form-control form-control-user"
                                      value="1acamilo"
                                      name="RepeatPassword"
                                          id="RepeatPassword" placeholder="Repeat Password" onChange={onChange}
                                        title="El password debe coincidir con su confirmación" 
                                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                          required
                                        />
                                        <Form.Control.Feedback type="invalid">El password debe coincidir con su confirmación</Form.Control.Feedback>
                                  </div>
                              </div>
                              <button className="btn btn-primary btn-user btn-block">
                                  Register Account
                              </button>
                              <hr/>
                              <a href="index.html" className="btn btn-google btn-user btn-block">
                                  <i className="fab fa-google fa-fw"></i> Register with Google
                              </a>
                              <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                  <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                              </a>
                          </Form>
                          <hr/>
                          <div className="text-center">
                              <a className="small" href="forgot-password.html">Forgot Password?</a>
                          </div>
                          <div className="text-center">
                              <a className="small" href="/">Already have an account? Login!</a>
                          </div>
                      </div>
                  </div>
              </div>
    )
}

export default Registro;