import React, {useState} from 'react'
import {Form, Modal, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as myConstants from './utils/constants';
import * as MySession from './utils/mysession';
import { useDispatch, useSelector } from 'react-redux';
import {MakeDepositThunk} from './utils/userSlice';

const Deposit = () => {

  console.log('**HACIENDO DEPOSIT..')  
  var User = useSelector(state => state.user.user)
  const dispatch = useDispatch();
  const [data, setData] = useState({formValidated:false, showModal:false})

  const onChange = (e) => {
      //updates form data in state
      setData({...data, [e.target.id]: e.target.value});
  }
  
  const handleSubmit2 = (e) => {
    var showModal = false;
    const form = e.currentTarget;
    //var JSONdata = Object.fromEntries(form.entries());
    const JSONdata = JSON.stringify(Object.fromEntries(new FormData(e.target)));
    e.preventDefault();
    e.stopPropagation();
    alert('pipas oh Pipas oh gran señor Pipas!!')
    //activates validation format to show errors
    setData({...data, formValidated: true, showModal:showModal});        

  }

  const handleSubmit = (e) => {
      var showModal = false;
      const form = e.currentTarget;
      const JSONdata = JSON.stringify(Object.fromEntries(new FormData(e.target)));
      e.preventDefault();
      e.stopPropagation();

      console.log('s viene el estallido')
      //return
    
      if (form.checkValidity()) {
        //if bank account selected is own show warning
        var curSelected = document.forms[0].Account.value
        if (curSelected === '1') {
            showModal = true;
        }
        else {
            //sends deposit to API
            try {
              //dispatch(MakeDepositThunk(JSONdata)).unwrap()
            }
            catch (err) {
              console.error('Failed to make deposit: ', err)
            }
        }
      }
      //activates validation format to show errors
      setData({...data, formValidated: true, showModal:showModal});        
  }

    const closeModal =  (sendForm) => {
      //if user stated OK own account, write deposit
      const JSONdata = JSON.stringify(Object.fromEntries(new FormData(sendForm)));
      if (sendForm) {
        try {
          dispatch(MakeDepositThunk(JSONdata)).unwrap()
        }
        catch (err) {
          console.error('Failed to make deposit: ', err)
        }
  }
      
      //upadtes state to hide modal only
      setData({...data, showModal:false});
   }

    const writeDeposit = async () => {
          var Form = new FormData(document.forms[0]);
          var JSONdata = Object.fromEntries(Form.entries());
          
          //adds account id
          JSONdata._id = User._id
                    
          //adds token
          //var token = useSelector(state => state.user.token)
          var token = 'pipas'
          JSONdata.token = token
          const endpoint = myConstants.config.API_URL + '/adddeposit'
          const options = {
            method: 'POST',
            body: JSON.stringify(JSONdata),
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
            if (!data.error){
              token = data
              //updates current session user data
              MySession.StoreToken(token)
              User = MySession.GetUserDatafromLocalStorageToken()
              strMsg = 'Your account was funded successfully!. Your new balance is $' + Intl.NumberFormat('en-US').format((Math.round(User.Balance * 100) / 100).toFixed(2))
              

              //removes form
              document.getElementById("FormDeposit").remove();
            }

            else {
              //if error is expired token, re-render app. else, show error msg to user
              strMsg = data.error
              if (data.error === "invalid or expired token!") {
                alert('Your session expired. Please login again')
                MySession.DeleteToken()
                //props.RerenderApp();
                
              }
            }
            document.getElementById('cuerpo_forma').innerText = strMsg
          })  
          .catch(function(error) {
            //just show error to user
            document.getElementById('cuerpo_forma').innerText = error
          });
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
            <Form id="FormDeposit" noValidate validated={data.formValidated} className="user" onSubmit={handleSubmit} method="POST">
            <p className=''>Please fill out this form to deposit funds on your Fantasy Bank account</p>

                <div className="form-group">
                    <Form.Control className="form-control-user" type="number" 
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
                    <option value="1"selected >My own bank account finished in 0987</option>
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

  const handleClose = (sendForm) => props.cerrar(sendForm);
  
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