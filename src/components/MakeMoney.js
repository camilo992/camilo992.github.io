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

const MakeMoney = () => {

    var curUserLoggedIn = MySession.GetLogedInUserData()
    var TotalAssets = Intl.NumberFormat('en-US').format((Math.round(curUserLoggedIn.Balance * 100) / 100).toFixed(2) + curUserLoggedIn.PromotionBonus + curUserLoggedIn.AcumProfits)
    var interestRate = Math.floor(curUserLoggedIn.Balance/1000)  //interest rate is 1% per each 1000 usd
    var timesAnimationShowed = 0
    var interval;
    var TotalTimesToShowAnimation = Math.floor(Math.random()*5) + 1 //between 1 and 5 seconds
    var Mysound
    var interestEarned

    const [data, setData] = useState({formValidated:false, showAnimation:false})

    const EndAnimation  = () => {
        
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
            interestEarned = interestRate*+curUserLoggedIn.Balance/100
            curUserLoggedIn.Balance =  +curUserLoggedIn.Balance + +interestEarned
            MySession.UpdateLogedInUserData(curUserLoggedIn)

            //updates user balance in server API
            sendMakeMoney();
            
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
        setData({...data, showAnimation:true});
                
    }
    
    const sendMakeMoney = async () => {
            var JSONdata = {}
            JSONdata.Amount = interestEarned
            JSONdata.Account = 9999 //this is only used to deposit money in deposit.js
            JSONdata._id = curUserLoggedIn._id
            JSONdata = JSON.stringify(JSONdata)

            const endpoint =myConstants.config.API_URL + '/adddeposit'
            const options = {
              method: 'POST',
              body: JSONdata,
            }
        
            //sends request to API
            const response = await fetch(endpoint, options)
            const result = await response.json()

            if (result.Respuesta === 'OK') {
                //shows success msg
                document.getElementById('cuerpo_forma').innerText = 'Your account was credited successfully!'  
            } else
                //shows error msg
                document.getElementById('cuerpo_forma').innerText = 'Something went wrong, please try again..'
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
                    <div className="p-3"><Image src={data.showAnimation?AnimationMakeMoney:AnimationMakeMoneyStill} className='user'align="center" width={336} height={192}/></div>
                </div>

                
            </div>
            

        </div>
    </div>
    </div>
)

}

export default MakeMoney;