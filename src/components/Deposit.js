import React, {useState} from 'react'
import {Form, Modal, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as myConstants from './constants';

const Deposit = () => {

    const [data, setData] = useState({formValidated:false, showModal:false})
    console.log(data)

    const onChange = (e) => {
        
        //ACTUALIZA EL ESTADO
        setData({...data, [e.target.id]: e.target.value});

   }
    
    const handleSubmit = (e) => {
        var showModal = false;
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
      
        //IF FORM IS VALIDATED
        if (form.checkValidity() === true) {

            //IF BANK ACCOUNT SELECTED IS OWN SHOW WARNING
            var curSelected = document.forms[0].Account.value
            console.log('curSelected!' + curSelected)
            if (curSelected === '1') {
                showModal = true;
            }
            else {
                //SENDS DEPOSIT
                writeDeposit();

            }

          }

            // ACTIVAMOS VALIDATION FORMAT PARA MOSTRAR LOS ERRORES
            setData({...data, formValidated: true, showModal:showModal});
            console.log("listo!")        

        
    }

    const closeModal = (sendForm) => {
        
        if (sendForm) {
            console.log('se fue forma!!')
            writeDeposit();
        }
        else
            console.log('NO se fue forma!!')
        
        
        //ACTUALIZA EL ESTADO
        console.log('cerrando modal')
        setData({...data, showModal:false});

   }

    const writeDeposit = async () => {
            var Form = new FormData(document.forms[0]);
            var JSONdata = Object.fromEntries(Form.entries());
            var depositAmount = JSONdata.Amount
            
            //ADDDS ACCOUNT ID
            var curUserLoggedIn = JSON.parse(localStorage.getItem('user'))
            JSONdata.ID = curUserLoggedIn.ID
            JSONdata = JSON.stringify(JSONdata);

      
            // API endpoint where we send form data.
            const endpoint =myConstants.API_URL + '/adddeposit'
        
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
                document.getElementById('cuerpo_forma').innerText = 'Your account was funded successfully!'  

                //UPDATES CURRENT LOGGED USER BALANCE
                console.log('curUserLoggedIn.Balance: ' + curUserLoggedIn.Balance)
                console.log('JSONdata.Amount: ' + depositAmount)
                curUserLoggedIn.Balance =  +curUserLoggedIn.Balance + +depositAmount
                console.log('curUserLoggedIn.Balance: ater ' + curUserLoggedIn.Balance)
                console.log('curUserLoggedIn after' + JSON.stringify(curUserLoggedIn))
                localStorage.setItem("user", JSON.stringify(curUserLoggedIn))


    
            } else {
                //MUESTRA MENSAJE DE EXITO
                document.getElementById('cuerpo_forma').innerText = 'Something went wrong, please try again..'
            }
   }

        


    return (        
        <div className="row justify-content-center">
            <ModalWarning show={data.showModal} cerrar={closeModal}/>
        <div className="col-lg-5 d-none d-lg-block bg-deposit-image"></div>
        
    <div className="col-lg-7">
        <div className="p-5">
            <div className="text-left" border="1">
                <h1 className="h5 mb-4"><Link to="/">Home</Link> / Make Deposit</h1>
                <h1 className="h4 text-gray-900 mb-4 text-center" id="cuerpo_forma">Make Deposit</h1>
            </div>
            <Form id="FormaRegistro" noValidate validated={data.formValidated} className="user" onSubmit={handleSubmit} method="POST">
            <p className=''>Please fill out this form to deposit funds on your Taoke Camilo account</p>

                <div className="form-group">
                    <Form.Control type="number" 
                    id="Amount"
                    name="Amount"
                    defaultValue={500}
                        placeholder="Type the amount to deposit" onChange={onChange}
                        title="Please write a valid amount" 
                        max="1000"
                        required
                    />
                    <Form.Control.Feedback type="invalid">Please write a valid amount. Maximum deposit is $1,000</Form.Control.Feedback>
                </div>
                <div className="form-group">
                <Form.Select 
                id="Account" 
                name="Account" 
                onChange={onChange}
                required
                >
                    <option value="">Please select an account to deposit from</option>
                    <option value="1" >My own bank account finished in 0987</option>
                    <option value="2" selected>Another guy's bank account finished in 0765</option>
                    <option value="3">Another guy's bank account finished in 0654</option>
                </Form.Select>
            <Form.Control.Feedback type="invalid">Please select an account from the list</Form.Control.Feedback>
                </div>
                <button className="btn btn-primary btn-user btn-block">
                    Make Deposit
                </button>
            </Form>
        </div>
    </div>
    </div>
)

}

function ModalWarning(props) {
    

    const handleClose = (algo) => props.cerrar(algo);
  
    return (
      <> 
        <Modal show={props.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Please Check! </Modal.Title>
          </Modal.Header>
          <Modal.Body>You chose to fund your account using our own money, when you could just use somebody else's account! Do you want to proceed?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(false)}>
              Oops! Let'me change it
            </Button>
            <Button variant="primary" onClick={() => handleClose(true)}>
              Yeah, I'm feeling honest
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default Deposit;