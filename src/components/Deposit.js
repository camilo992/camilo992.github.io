import React, {useState} from 'react'
import {Form, Modal, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as myConstants from './constants';
import * as MySession from './mysession';


const Deposit = () => {

    const [data, setData] = useState({formValidated:false, showModal:false})
    var curUserLoggedIn = MySession.GetLogedInUserData()

    const onChange = (e) => {
        //updates form data in state
        setData({...data, [e.target.id]: e.target.value});
   }
    
    const handleSubmit = (e) => {
        var showModal = false;
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
      
        if (form.checkValidity()) {

            //if bank account selected is own show warning
            var curSelected = document.forms[0].Account.value
            if (curSelected === '1') {
                showModal = true;
            }
            else {
                //dends deposit to API
                writeDeposit();
            }
          }
            //activates validation format to show errors
            setData({...data, formValidated: true, showModal:showModal});        
    }

    const closeModal = async (sendForm) => {
        //if user stated OK own account, write deposit
        if (sendForm) {
            await writeDeposit();
        }
        
        //upadtes state to hide modal only
        setData({...data, showModal:false});
   }

    const writeDeposit = async () => {
            var Form = new FormData(document.forms[0]);
            var JSONdata = Object.fromEntries(Form.entries());
            var depositAmount = JSONdata.Amount
            
            //adds account id
            JSONdata._id = curUserLoggedIn._id
            JSONdata = JSON.stringify(JSONdata);
            const endpoint = myConstants.API_URL + '/adddeposit'
            const options = {
              method: 'POST',
              body: JSONdata,
            }
            //sends request to API
            const response = await fetch(endpoint, options)
            const result = await response.json()

            if (result.Respuesta === 'OK') {
                //removes form
                document.getElementById("FormaRegistro").remove();
                //shows success msg
                document.getElementById('cuerpo_forma').innerText = 'Your account was funded successfully!'  
                //updates current session user data
                curUserLoggedIn.Balance =  +curUserLoggedIn.Balance + +depositAmount     
                MySession.UpdateLogedInUserData(curUserLoggedIn)
            } 
            else
                //shows error msg
                document.getElementById('cuerpo_forma').innerText = 'Something went wrong, please try again..'
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
                    //defaultValue={500}
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
                    <option value="2">Another guy's bank account finished in 0765</option>
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