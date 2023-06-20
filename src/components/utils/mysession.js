import ls from 'localstorage-slim';
//import encUTF8 from 'crypto-js/enc-utf8';
//import AES from 'crypto-js/aes';

/*function ConfigureStorageAndEncryption(secret) {
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
            DeleteToken()
            return -1;
        }
        };
}*/

export function StoreToken(token) {
    //saves token ecncrypted on localstorage
    //extracts user from token payload
    //var user = JSON.parse(window.atob(token.split('.')[1]));
    //ConfigureStorageAndEncryption(user._id);
    ls.set('user', token);
    return;
}

export function GetToken()  {
    //retrieves token from localstorage

    //var user = JSON.parse(window.atob(token.split('.')[1]));
    //ConfigureStorageAndEncryption(user._id);

    var token = ls.get('user')
    return token;
}

export function DeleteToken()  {
    //destroys session
    localStorage.removeItem('user');    
}
