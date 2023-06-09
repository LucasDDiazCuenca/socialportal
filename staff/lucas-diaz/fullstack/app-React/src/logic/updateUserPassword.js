import { validators } from 'com'
import { loadUsers, saveUsers, findUserById} from "../data.js";
const {validatePasswordsChanges, validateId} = validators

export default function updateUserPassword(authenticatedUserId, password, newPassword, newPasswordConfirm, callback) {
    validatePasswordsChanges(password,newPassword, newPasswordConfirm);
    validateId( authenticatedUserId)
    
    loadUsers( _users => {
        
        findUserById(authenticatedUserId, currentUser => {

            const currentUserIndex = _users.findIndex(user => user.id === authenticatedUserId);
    
            if (currentUser.password !== password) {
                callback(new Error("typed password isn't actual password user's value"));
                return;
            }
            if (password === newPassword){
                callback(new Error("Password is equal than new password"))
                return
            } 
            if (newPassword !== newPasswordConfirm){
                callback(new Error("New password and new password confirmation are not the same"))
                return
            } 
            
            _users[currentUserIndex].password = newPassword;
        
            saveUsers(_users, () => callback(null));
        });
    })
}
