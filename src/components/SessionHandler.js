import Login from './Login';

export default function Pipas (props) {
  
    //GETS USER IF EXISTS
    var dataUsuarioLogged = localStorage.getItem("user") == null ? '{}':JSON.parse(localStorage.getItem("user"));
    
    //IF USER FOUND
    if (dataUsuarioLogged !== '{}') {
        console.log("si hay user");
        return (  
        props.Component
        )
    }
    else {
        console.log("no hay user");
        return (
        //NO USER LOGGED IN, SHOW LOGIN FORM
        <Login/>
        )
    }
  }
