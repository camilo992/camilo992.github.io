import Login from './Login';
import * as MySession from './mysession';

export default function SessionHandler (props) {
    if (MySession.IsThereSession())
        return (props.Component)
    else
        return(<Login RerenderApp={props.RerenderApp}/>)
}
