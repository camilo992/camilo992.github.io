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

    let User = ls.get('user')

    if (User) {
        //checks i user is valid user object
        try {
            let Userid = JSON.parse(User)._id;
            return Userid ? true: false;
        } catch(e) {
            //Not an user or there is no secret to decrypt:
            return false;
        }       
    }
    else
        return false;
}

export function LogInUser(user) {

    ConfigureStorageAndEncryption(user._id);
    ls.set('user', JSON.stringify(user));
    return 1;
}

export function UpdateLogedInUserData(user) {
    ls.set('user', JSON.stringify(user));
    return 1;
}

export function GetLogedInUserData() {
    var User = ls.get('user')
    try {
        User = JSON.parse(User);
    } catch(e) {
        console.log(e)
    }
    return User;
}

export function LogOutUser()  {
    //destroys session
    localStorage.removeItem('user');    
}
