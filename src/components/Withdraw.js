import React, {useState} from 'react'
import {Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as myConstants from './constants';
import * as MySession from './mysession';



const Withdraw = () => {
    const [data, setData] = useState({formValidated:false})
    var curUserLoggedInBalance = MySession.GetUserDatafromToken().Balance

    const onChange = (e) => {
        //updates form data in state
        setData({...data, [e.target.id]: e.target.value});
   }
    
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
      
        if (form.checkValidity()) {
            writeWithdrawal();
        }

        //activates validation format to shows errors in form
        setData({...data, formValidated: true});
        
    }

    const writeWithdrawal = async () => {
                //hides form
                document.getElementById("FormaRegistro").remove();
                //show random error message because you can't withdraw your money!!!
                var msgNum = Math.floor(Math.random()*9) //RANDOM NUMBER 0-9
                document.getElementById('cuerpo_forma').innerText = myConstants.WITHDRAWAL_ERROR_MESSAGES[msgNum]
   
   }

        


    return (        
        <div className="row justify-content-center">
        <div className="col-lg-5 d-none d-lg-block bg-withdrawal-image"></div>
        
    <div className="col-lg-7">
        <div className="p-5">
            <div className="text-left" border="1">
                <h1 className="h5 mb-4"><Link to="/">Home</Link> / Make Withdrawal</h1>
                <h1 className="h4 text-gray-900 mb-4 text-center" id="cuerpo_forma">Make Withdrawal</h1>
            </div>
            <Form id="FormaRegistro" noValidate validated={data.formValidated} className="user" onSubmit={handleSubmit} method="POST">
            <p className=''>Please fill out this form to withdraw funds from your Taoke Camilo account</p>

                <div className="form-group">
                    <Form.Control type="number" 
                    id="Amount"
                    name="Amount"
                        placeholder="Type the amount to withdraw" onChange={onChange}
                        title="Please write a valid amount" 
                        required
                        max = {curUserLoggedInBalance}
                    />
                    <Form.Control.Feedback type="invalid">Please write a valid amount. Also, make sure it is not more than your current available balance (${curUserLoggedInBalance})</Form.Control.Feedback>
                </div>
                <div className="form-group">
                <Form.Select 
                id="Account" 
                name="Account" 
                //defaultValue=""
                onChange={onChange}
                required
                >
                    <option value="">Please select an account to deposit TO</option>
                    <option value="1">My own bank account finished in 0987</option>
                    <option value="2">My Bitcoin account ended in 0987</option>
                    <option value="3">My Ethereum account ended in 0987</option>
                </Form.Select>
            <Form.Control.Feedback type="invalid">Please select an account from the list</Form.Control.Feedback>
                </div>
                <button className="btn btn-primary btn-user btn-block">
                    Make Withdrawal
                </button>
            </Form>
        </div>
    </div>
    </div>
)

}


export default Withdraw;