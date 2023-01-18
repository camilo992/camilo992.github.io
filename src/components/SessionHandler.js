import Login from './Login';

export default function SessionHandler (props) {
    //if ther is a valid User, then there is session. Proceed. 
    if (props.User)
        return (props.Component)
    else
        //if not a User, show Login form.
        return(<Login RerenderApp={props.RerenderApp}/>)
}
