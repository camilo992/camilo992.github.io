import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {InsertUserChatMessage, InsertChatBotMessageThunk} from './utils/chatSlice';

const CustomerService = () => {
	console.log('**EN CUSTOMER SERVICE.. ')
	var Messages = useSelector(state => state.chat.messages)
  const messagesStatus = useSelector(state => state.chat.status)
  var dispatch = useDispatch()
  const chatWindowRef = useRef(null);

  useEffect(() => {
    //SETS CHAT WINDOWS SCROLL DOWN
    const chatWindow = chatWindowRef.current;
    chatWindow.scrollTop = chatWindow.scrollHeight;    
  });

   const NewMessage = (props) => {
    var MessageDate = new Date(props.message.iat);
    var FormattedDate = MessageDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) +  ' | ' + MessageDate.toLocaleString('default', { month: 'long' }).substring(0,3) + ' ' + MessageDate.getDate() 
    var Avatar ,Align, BgMessage, FontColor
  
    if (props.message.author === 'ChatBot') {
      Avatar = <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="50" className="rounded-circle" />
      Align = 'media-body ml-3'
      BgMessage = 'bg-light rounded py-2 px-3 mb-2'
      FontColor = 'text-small mb-0 text-muted'
    } else {
      Avatar = ''
      Align = 'media-body'
      BgMessage = 'bg-primary rounded py-2 px-3 mb-2'
      FontColor = 'text-white text-small mb-0'
    }
    
    return (
      <div className="media w-100 mb-3">{Avatar}
      <div className={Align}>
        <div className={BgMessage}>
          <p className={FontColor}>{props.message.text}</p>
        </div>
        <p className="small text-muted">{FormattedDate}</p>
      </div>
      </div>
    )
  }


  const MyForm = () => {
    const [userChat, setUserChat] = useState("Write a message to customer support..");
    var buttonDisabled = false

    async function onSubmit(event) {
      event.preventDefault();
  
      if (userChat !== '') {
        setUserChat('')
        dispatch(InsertUserChatMessage(userChat))
        dispatch(InsertChatBotMessageThunk(userChat))
      }
    }
    switch (messagesStatus) {
      case 'loading': {
        buttonDisabled = true    
        break;
      }
      case 'succeeded': {  
        buttonDisabled = false    
        break;
      }
      default: {
        break;
      }
  
    }
  
    return (
      <form onSubmit={onSubmit} className="bg-light">
      <div className="input-group">
        <input type="text" value={userChat} onChange={(e) => {
          setUserChat(e.target.value);
        }} onFocus={() => setUserChat('')} placeholder="Type a message" aria-describedby="button-addon2" className="form-control rounded-0 border-0 py-4 bg-light" />
        <div className="input-group-append">
          <button disabled={buttonDisabled} onClick={onSubmit} id="button-addon2" type="button" className="btn btn-link"> <i className="fa fa-paper-plane"></i></button>
        </div>
      </div>
    </form>

    )
  }
  

  return (        
	<div className="row justify-content-center">
	<div className="col-lg-5 d-none d-lg-block bg-customerservice-image"></div>
	<div className="col-lg-7">
	<div className="p-5">
	<div className="text-left">
	<h1 className="h5 mb-4"><Link to="/">Home</Link> / Customer Service</h1>
	<h1 className="h4 text-gray-900 text-center" id="cuerpo_forma">Customer Service</h1>
		<div className="maincontainer">
       <div className="container py-5 px-4">
        <div className="row rounded-lg overflow-hidden shadow">
          <div className="col-12 px-0">
            <div id="chatbox" ref={chatWindowRef} className="px-4 py-5 chat-box bg-white " style={{overflowY: 'scroll', maxHeight: '30em', height: "800px"}}>
            {Messages.map((message) => <NewMessage key={message.iat} message={message}/>)}
            </div>
            <MyForm/>
          </div>
        </div>
      </div>
      </div>


		<div>
    </div>
	</div>
	</div>
	</div>
	</div>
	)
}

export default CustomerService;