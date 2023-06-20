import React, {useState} from 'react'
import {Form, Modal, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {MakeDepositThunk} from './utils/userSlice';

const Deposit = () => {

  console.log('**HACIENDO DEPOSIT..')  
  var firstTime = true;
  var User = useSelector(state => state.user.user)
  var token = useSelector(state => state.user.token)
  const dispatch = useDispatch();
  const [data, setData] = useState({formValidated:false, showModal:false, firstTime:true})
  const depositStatus = useSelector(state => state.user.status)
  const depositStatusError = useSelector(state => state.user.error)


  const onChange = (e) => {
      //updates form data in state
      setData({...data, [e.target.id]: e.target.value});
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    var showModal = false;
    const form = e.currentTarget;
    const JSONdata = Object.fromEntries(new FormData(e.target));
    //adds account id & token
    JSONdata._id = User._id
    JSONdata.token = token
   
    if (form.checkValidity()) {
      //if bank account selected is own show warning
      var curSelected = document.forms[0].Account.value
      if (curSelected === '1') {
          showModal = true;
      }
      else {
          //sends deposit to API
          try {
            dispatch(MakeDepositThunk(JSONdata)).unwrap()
            //its no longer first time
            firstTime = false
          }
          catch (err) {
            console.error('Failed to make deposit: ', err)
          }
      }
    }
    //activates validation format to show errors
    setData({...data, formValidated: true, firstTime:firstTime, showModal:showModal});        
  }

  const closeModal =  (shouldSendForm) => {
    //if user stated OK own account, write deposit

    var Form = new FormData(document.forms[0]);
    var JSONdata = Object.fromEntries(Form.entries());
    //adds account id & token
    JSONdata._id = User._id
    JSONdata.token = token
    if (shouldSendForm) {
      try {
        dispatch(MakeDepositThunk(JSONdata)).unwrap()
        firstTime = false
      }
      catch (err) {
        console.error('Failed to make deposit: ', err)
      }
    }    
    //upadtes state to hide modal only
    setData({...data, firstTime:firstTime, showModal:false});
  }

  var strUserMessage = 'Make Deposit'
    
  switch (depositStatus) {
    case 'loading': {
      strUserMessage = 'Please wait. I\'m working on this'
      break;
    }
    case 'failed': {
      //only if not first time show error
      if (!data.firstTime) {
        strUserMessage = depositStatusError
      }
      break;
    }
    case 'succeeded': {  
      //if is not the first time, the form was sent to the server and got processed
      if (!data.firstTime) {
        var Balance = Intl.NumberFormat('en-US').format((Math.round(User.Balance * 100) / 100).toFixed(2))
        strUserMessage = "Your deposit was successful! Your current balance is: $" + Balance
        document.getElementById("FormDeposit").remove();
      }
      break;
    }
    default: {
      break;
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
            <h1 className="h4 text-gray-900 mb-4 text-center" id="cuerpo_forma">{strUserMessage}</h1>
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
            <option value="1" selected >My own bank account finished in 0987</option>
            <option value="2" >Another guy's bank account finished in 0765</option>
            <option value="3">Another guy's bank account finished in 0654</option>
          </Form.Select>
        </div>
        <Form.Control.Feedback type="invalid">Please select an account from the list</Form.Control.Feedback>
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

  const handleClose = (shouldSendForm) => props.cerrar(shouldSendForm);
  
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