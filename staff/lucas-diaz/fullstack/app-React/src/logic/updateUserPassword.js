import { validators } from 'com'
const {validatePassword, validateId} = validators

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirmation, callback) {
    validatePassword(password)
    validatePassword(newPassword)
    validatePassword(newPasswordConfirmation) 
    validateId( userId)
    
    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
    
        if (status !== 204) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)
    
            callback(new Error(error))    
            return
        }

        callback(null)
    }


    xhr.onerror = () => {
        callback(new Error('connection error'))
    }


    xhr.open('PATCH',`http://localhost:4000/users/password/${userId}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    let data =  {password, newPassword, newPasswordConfirmation}

    let json = JSON.stringify(data)

    xhr.send(json)
}
