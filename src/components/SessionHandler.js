import Login from './Login';
import {IsThereSession} from './mysession';

export default function SessionHandler (props) {
  
    if (IsThereSession()) {
        return (  
        props.Component
        )
    }
    else {
        return (
        <Login/>
        )
    }
  }
