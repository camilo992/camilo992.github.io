import React, {useState} from 'react'
import {Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {MakeDepositThunk} from './utils/userSlice';

//graphic and audio assets
import AnimationMakeMoneyStill from '../images/image_slot_machine_still.gif';  
import AnimationMakeMoney from '../images/image_slot_machine.gif';  
import SlotMachineSound from '../audio/sound_slot_machine_full.wav';  

const MakeMoney = (props) => {  
  console.log('**HACIENDO MAKE MONEY..')   
  var User = useSelector(state => state.user.user)
  var token = useSelector(state => state.user.token)
  const depositStatus = useSelector(state => state.user.status)
  const depositStatusError = useSelector(state => state.user.error)
  const dispatch = useDispatch();
  var TotalAssets = Intl.NumberFormat('en-US').format((Math.round(User.Balance * 100) / 100).toFixed(2) + User.PromotionBonus + User.AcumProfits)
  var interestRate = Math.floor(User.Balance/1000)  //interest rate is 1% per each 1000 usd
  var Mysound
  var interestEarned

  const [data, setData] = useState({firstTime:true})

  const GenerateInterest = () => {
    //updates balance on server
    interestEarned = interestRate*+User.Balance/100
    try {
      var JSONdata = {}
      //adds balance info fields
      JSONdata.Amount = interestEarned
      JSONdata.Account = 9999 //this is only used to deposit money in deposit.js
      JSONdata._id = User._id
      //adds token
      JSONdata.token = token
      dispatch(MakeDepositThunk(JSONdata)).unwrap()
      //its no longer first time
    }
    catch (err) {
      console.error('Failed to update balance on server: ', err)
    }
    //starts audio
    Mysound = new Audio (SlotMachineSound)
    Mysound.play();
    setData({firstTime:false});
  }

  var strUserMessage = 'Make Money'
  var currentSlotMachineImage = AnimationMakeMoneyStill
  var buttonDisabled = false
  switch (depositStatus) {
    case 'loading': {
      strUserMessage = 'Please wait. I\'m working on this'
      currentSlotMachineImage = AnimationMakeMoney
      buttonDisabled = true
      break;
    }
    case 'failed': {
      //only if not first time show error
      if (!data.firstTime) {
        strUserMessage = depositStatusError
        buttonDisabled = true
      }
      break;
    }
    case 'succeeded': {  
      //if is not the first time, the form was sent to the server and got processed
      if (!data.firstTime) {
        var Balance = Intl.NumberFormat('en-US').format((Math.round(User.Balance * 100) / 100).toFixed(2))
        strUserMessage = "Your deposit was successful! Your current balance is: $" + Balance
      }
      break;
    }
    default: {
      break;
    }

  }

  return (        
    <div className="row justify-content-center">
    <div className="col-lg-5 d-none d-lg-block bg-make_money-image"></div>
    <div className="col-lg-7">
    <div className="p-5">
    <div className="text-left">
    <h1 className="h5 mb-4"><Link to="/">Home</Link> / Make Money!</h1>
    <h1 className="h4 text-gray-900 text-center" id="cuerpo_forma">{strUserMessage}</h1>
    Why wait years to build your wealth?  Now you don't need to! With Fantasy Bank, all you have to do to earn interest is click the button below! Do it as many times as you like!
    <div className="font-weight-bold text-success">Current balance: ${TotalAssets}</div>
    <div className="font-weight-bold text-danger">Current interest rate: {interestRate}%</div>
    <button className="btn btn-primary btn-user btn-block" onClick={GenerateInterest} disabled={buttonDisabled}>
    Make Money!!!!
    </button>
    <div className='text-center'>
    <div className="p-3"><Image src={currentSlotMachineImage} className='user'align="center" width={168} height={96}/></div>
    </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default MakeMoney;