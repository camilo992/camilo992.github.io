import ls from 'localstorage-slim';
import encUTF8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';


function ConfigureStorageAndEncryption(secret) {
    // update localstorage-slim
    ls.config.encrypt = true;             // global encryption
    ls.config.secret = secret
    // update encrypter to use AES encryption
    ls.config.encrypter = (data, secret) => AES.encrypt(JSON.stringify(data), secret).toString();
    // update decrypter to decrypt AES-encrypted data
    ls.config.decrypter = (data, secret) => {
        try {
            return JSON.parse(AES.decrypt(data, secret).toString(encUTF8));
        } catch (e) {
            // incorrect/missing secret, session is dead
            console.log('incorrect missing secret')
            LogOutUser()
            return -1;
        }
        };
}

export function IsThereSession () {

    let token = ls.get('user')

    if (token) {
        //checks i user is valid user object
        try {
            //extracts user from token payload
            let Userid = JSON.parse(window.atob(token.split('.')[1]))._id;
            return Userid ? true: false;
        } catch(e) {
            //Not an user or there is no secret to decrypt:
            return false;
        }       
    }
    else
        return false;
}

export function LogInUser(token) {

    //extracts user from token payload
    var user = JSON.parse(window.atob(token.split('.')[1]));
    ConfigureStorageAndEncryption(user._id);
    ls.set('user', JSON.stringify(token));
    return 1;
}

export function UpdateLogedInUserData(token) {
    ls.set('user', JSON.stringify(token));
    return 1;
}

export function GetLogedInUserData() {
    var token = JSON.stringify(ls.get('user'))
   
    try {
        //extracts user from token payload
        var User = JSON.parse(window.atob(token.split('.')[1]));
    } catch(e) {
        console.log(e)
    }
    return User;
}

export function GetToken()  {
    console.log('aca en gettoek')
    var token = ls.get('user')
    return token;
}

export function LogOutUser()  {
    //destroys session
    localStorage.removeItem('user');    
}
