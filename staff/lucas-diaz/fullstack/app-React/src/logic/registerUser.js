import { validators } from 'com'

const {validateEmail, validateUsername, validatePassword} = validators

export default function registerUser(userName, email, password, callback) {
    validateUsername(userName);
    validateEmail(email);
    validatePassword(password);

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const payload = JSON.parse(xhr.response)

        callback(null, payload)
    }

    xhr.onerror = () => {
        callback(new Error("conection error"));
    }
    //tenemos que enviar la cabecera 
    xhr.setRequestHeader("Content-Type", "application/json")

    const user = {userName, email, password}
    const json = JSON.stringify(user)

    xhr.open("POST", "http://localhost:4000/users")
    xhr.send(json)
}


