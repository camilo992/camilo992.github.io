import {useState} from 'react'
import {Form, Modal, Button} from 'react-bootstrap';

export default function Deposit () {

    const [data, setData] = useState({formValidated:false, showModal: false})
    console.log("render object Deposit")
    console.log(data)

    const onChange = (e) => {
        
        //ACTUALIZA EL ESTADO
        console.log('on change event!')
        setData({...data, [e.target.id]: e.target.value});

    }
    
    
    //METHOD TO CLOSE MODAL WINDOW FROM MODAL 
    const closeModal = (sendForm) => {
        
      //IF USER SENDS FORM  
      if (sendForm) {
          console.log('se va esta forma!!!')
          writeDeposit();
          console.log('listo se ue')
        }
        //USER DOES NOT SEND FORM  
        else {
         //hides modal window && updates warningSelectDone variable/
          console.log('se cerro el modal y no hace nada mas')
        }
        //updates state to hide modal window
        setData({...data, showModal: false});

      }
    
    
    //HANDLE FORM SEND METHOD
    const handleSubmit = async (e) => {

        console.log('ENVIANDO FORMA..')
        const form = e.currentTarget;
        
        e.preventDefault();
        e.stopPropagation();
        writeDeposit();

            //**CHABONADA¡¡: RERENDERS AFTER CREATING SESSION 
            //setData({...data, [e.target.id]: e.target.value});
            console.log("fin de onSubmit")


       
    }
    const  writeDeposit = async () =>    {
        //UPDATES CLIENT'S DEPOSIT ON PERSISTENT DATA. FORM IS ALREADY VALIDTED
        //ENVIAMOS LA FORMA
        console.log('forma valida, select ok, esto se va!!')
        
        //TOMA LA DATA DE LA FORMA Y LA VUELVE OBJETO JSON
        const JSONdata = JSON.parse(JSON.stringify(Object.fromEntries(new FormData(document.forms[0]))));
        
        //ADDS USER ID TO THE DATA
        var curUserLoggedIn = JSON.parse(localStorage.getItem('user'))
        JSONdata.ID = curUserLoggedIn.ID

        console.log('JSONdata:' + JSON.stringify(JSONdata));
                    
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
        console.log('cucucu')
        console.log('endpoint:' + endpoint)
        console.log('options:' + JSON.stringify(options))
        const response = await fetch(endpoint, options)
    
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();
        console.log('por aca voy...')

        //IF AN OBJECT ARRIVED CREATES SESSION
        if (result !== '{}') {

            //CREA LA SESION
            localStorage.setItem("user", result)
            console.log("sesion creada!")
        } else {
            //MUESTRA FORMA OTRA VEZ
            document.getElementById('cuerpo_forma').innerText = 'Mmm.. that didn\'t go well. Please try again..'
        }

        return true;

    }


    return (
        <div className="row justify-content-center">
            <div className="col-lg-5 d-none d-lg-block bg-deposit-image"></div>
            
        <div className="col-lg-7">
            <div className="p-5">
                <div className="text-left" border="1">
                    <h1 className="h5 mb-4">Home / Make Deposit</h1>
                    <h1 className="h4 text-gray-900 mb-4 text-center" id="cuerpo_forma">Make Deposit</h1>
                    <p className=''>Please fill out this form to deposit funds on your Taoke Camilo account</p>
                </div>
                <Form id="FormaRegistro" noValidate validated={data.formValidated} className="user" onSubmit={handleSubmit} method="POST">
                    <div className="form-group">
                        <Form.Control type="number" 
                          id="Amount"
                          name="Amount"
                            placeholder="Type the amount to deposit" onChange={onChange}
                            title="Please write a valid amount" 
                            required
                        />
                        <Form.Control.Feedback type="invalid">Please write a valid amount</Form.Control.Feedback>
                    </div>
                    <div className="form-group">
                    <Form.Select 
                      id="Account" 
                      name="Account" 
                      defaultValue=""
                      onChange={onChange}
                      required
                      >
                        <option value="">Please select an account to deposit from</option>
                        <option value="1">My own bank account finished in 0987</option>
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
