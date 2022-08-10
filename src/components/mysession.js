

export function IsThereSession () {
    //chekcs for session if _id is not empty
    let User = localStorage.getItem("user")
    if (User)
        return true;
    else
        return false;
}

export function UpdateLogedInUserData(user) {
    localStorage.setItem("user", JSON.stringify(user))
    return 1;
}

export function GetLogedInUserData() {
    var User = JSON.parse(localStorage.getItem("user"))
    return User;
}

export function LogOutUser()  {
    //destroys session
    localStorage.removeItem('user');    
}
