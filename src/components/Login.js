import React, {useState} from 'react'
import {Form} from 'react-bootstrap';
import * as myConstants from './constants';

const Login = () => {

    console.log("begin render login...")

    const [data, setData] = useState({formValidated:false})
    console.log(data)

    const onChange = (e) => {
        
        //ACTUALIZA EL ESTADO
        console.log('on change event!')
        setData({...data, [e.target.id]: e.target.value});

    }

    const handleSubmit = async (e) => {

        console.log('ENVIANDO FORMA..')
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
            console.log('aca voy..')
            e.preventDefault();
            
            //TOMA LA DATA DE LA FORMA Y LA VUELVE OBJETO JSON
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

                //CREA LA SESION
                localStorage.setItem("user", result)
                //console.log("usuario: " + JSON.stringify(result))
                console.log("sesion creada!")
            } else {
                //MUESTRA FORMA OTRA VEZ
                document.getElementById('cuerpo_forma').innerText = 'Mmm.. that didn\'t go well. Please try again..'
            }
            

          }

            console.log("lito vamos a recargar!!!")
            window.location.reload()


       
    }
    
    return (
              <div className="row justify-content-center">
                  <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
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
                              <a href="index.html" className="btn btn-google btn-user btn-block">
                                  <i className="fab fa-google fa-fw"></i> Login with Google
                              </a>
                              <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                  <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                              </a>
                          </Form>
                          <hr/>
                          <div className="text-center">
                              <a className="small" href="forgot-password.html">Forgot Password?</a>
                          </div>
                          <div className="text-center">
                              <a className="small" href="/registro">Create an Account!</a>
                          </div>
                      </div>
                  </div>
              </div>
      );
}
    
    export default Login;