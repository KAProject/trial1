function open_admin() {
    let password = "mytechz_admin";
    let passkey = prompt("Enter admin Password");
    if(passkey === password) {
        document.location.href = "/admin.html";
    }
    else{
        alert("Wrong Password");
    }
    
}