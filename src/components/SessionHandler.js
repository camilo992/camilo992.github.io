import Login from './Login';
import {useSelector} from 'react-redux';

export default function SessionHandler (props) {
    var User = useSelector(state => state.user.user)
    //if ther is a valid User, then there is session. Proceed. 
    if (User)
        return props.Component
    else
        //if not a User, show Login form.
        return(<Login/>)
        
}
