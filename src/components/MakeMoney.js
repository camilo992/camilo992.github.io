import React, {useState} from 'react'
import {Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as myConstants from './constants';
import * as MySession from './mysession';

//graphic and audio assets
import AnimationMakeMoneyStill from '../images/image_slot_machine_still.gif';  
import AnimationMakeMoney from '../images/image_slot_machine.gif';  
import SlotMachineSound from '../audio/sound_slot_machine.wav';  
import SlotMachineSoundFinal from '../audio/sound_slot_machine_success.mp3';  


const MakeMoney = (props) => {  
    console.log('**HACIENDO MAKE MONEY..')   
    var User = MySession.GetUserDatafromToken()
    var TotalAssets = Intl.NumberFormat('en-US').format((Math.round(User.Balance * 100) / 100).toFixed(2) + User.PromotionBonus + User.AcumProfits)
    console.log('rendering..  TOTALASSETS es:' +TotalAssets )
    var interestRate = Math.floor(User.Balance/1000)  //interest rate is 1% per each 1000 usd
    var timesAnimationShowed = 0
    var interval;
    var TotalTimesToShowAnimation = 1 //Math.floor(Math.random()*5) + 1 //between 1 and 5 seconds
    var Mysound
    var interestEarned

    const [data, setData] = useState({formValidated:false, showAnimation:false})

    const EndAnimation  = async () => {
        
        console.log('comenzando EndAnimation')
        timesAnimationShowed++;
        if  ((timesAnimationShowed===TotalTimesToShowAnimation)||(!data.showAnimation)) {
            clearInterval(interval)
            
            //turns off sound
            Mysound.pause()

            //play final fanfare audio
            Mysound = new Audio (SlotMachineSoundFinal)
            Mysound.loop = false;
            Mysound.play()
            //updates balance in user session
            interestEarned = interestRate*+User.Balance/100
            //updates user balance in server API
            await sendMakeMoney();

            console.log('a punto de rerender despues de llamar sendmakemoney !')
            
            //re-render with animation turned off
            setData({...data, showAnimation:false});
            
        }        
    }

    //if showing animation, set timer
    if (data.showAnimation) {
        //starts iterval
        interval = setInterval(EndAnimation, 4000);

        //starts audio
        Mysound = new Audio (SlotMachineSound)
        Mysound.loop = true;
        Mysound.play();
    }
    
    const GenerateInterest = () => {

        //rerenders to show animation
        console.log('dentro degenerateinterest a punto de re-render con anim turned on')
        setData({...data, showAnimation:true});
                
    }
    
    const sendMakeMoney = async () => {
            console.log('comenzando sendmakemony')
            var JSONdata = {}
            //adds balance info fields
            JSONdata.Amount = interestEarned
            JSONdata.Account = 9999 //this is only used to deposit money in deposit.js
            JSONdata._id = User._id
            //adds token
            var token =  MySession.GetToken()
            JSONdata.token = token

            const endpoint = myConstants.config.API_URL + '/adddeposit'
            const options = {
              method: 'POST',
              body: JSON.stringify(JSONdata),
            }

            //sends request to API
            await fetch(endpoint, options)  
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
                  strMsg = 'Your account was funded successfully!'
                  token = data
                  //updates current session user data
                  MySession.StoreToken(token)
                }
    
                else {
                  //if error is expired token, re-render app. else, show error msg to user
                  strMsg = data.error
                  if (data.error === "invalid or expired token!") {
                    alert('Your session expired. Please login again')
                    MySession.DeleteToken()
                    props.RerenderApp();
                    
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
        <div className="col-lg-5 d-none d-lg-block bg-make_money-image"></div>
        
    <div className="col-lg-7">
        <div className="p-5">
            <div className="text-left">
                <h1 className="h5 mb-4"><Link to="/">Home</Link> / Make Money!</h1>
                <h1 className="h4 text-gray-900 text-center" id="cuerpo_forma">Make Money!</h1>

                Why wait years to build your wealth?  Now you don't need to! With Taoke Camilo, all you have to do to earn interest is click the button below! Do it as many times as you like!

                <div className="font-weight-bold text-success">Current balance: ${TotalAssets}</div>
                <div className="font-weight-bold text-danger">Current interest rate: {interestRate}%</div>
                <button className="btn btn-primary btn-user btn-block" onClick={GenerateInterest} disabled={data.showAnimation}>
                    Make Money!!!!
                </button>
                <div className='text-center'>
                    <div className="p-3"><Image src={data.showAnimation?AnimationMakeMoney:AnimationMakeMoneyStill} className='user'align="center" width={168} height={96}/></div>
                </div>

                
            </div>
            

        </div>
    </div>
    </div>
)

}

export default MakeMoney;