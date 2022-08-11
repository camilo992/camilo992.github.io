import ls from 'localstorage-slim';
import encUTF8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';

// update localstorage-slim
ls.config.encrypt = true;             // global encryption
ls.config.secret = "not so secret";   // global secret

// update encrypter to use AES encryption
ls.config.encrypter = (data, secret) => AES.encrypt(JSON.stringify(data), secret).toString();

// update decrypter to decrypt AES-encrypted data
ls.config.decrypter = (data, secret) => {
    try {
        return JSON.parse(AES.decrypt(data, secret).toString(encUTF8));
    } catch (e) {
        // incorrect/missing secret, return the encrypted data instead
        return data;
    }
    };

export function IsThereSession () {
    //chekcs for session if _id is not empty
    let User = localStorage.getItem("user")
    if (User)
        return true;
    else
        return false;
}

export function LogInUser(user) {

    // use ls.set() to encrypt data  
    ls.set('user', JSON.stringify(user));

    return 1;
}

export function UpdateLogedInUserData(user) {
    ls.set('user', JSON.stringify(user));
    //localStorage.setItem("user", JSON.stringify(user))
    return 1;
}

export function GetLogedInUserData() {

    var User = JSON.parse(ls.get('user'))
    //var User = JSON.parse(localStorage.getItem("user"))
    return User;
}

export function LogOutUser()  {
    //destroys session
    localStorage.removeItem('user');    
}
