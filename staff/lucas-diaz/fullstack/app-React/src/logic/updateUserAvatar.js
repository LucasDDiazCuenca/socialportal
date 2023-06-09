import { validators } from 'com'
import { saveUser, findUserById } from "../data.js";
const {validateId, validateUrl} = validators 

export default function updateUserAvatar(authenticatedUserId, avatarUrl, callback)  { 
    validateId(authenticatedUserId);
    validateUrl(avatarUrl);


    findUserById(authenticatedUserId, foundUser => {
        
        if (!foundUser){
            callback(new Error("user not found"));
            return;
        } 
    
        foundUser.avatar = avatarUrl;
        
        saveUser(foundUser, () => callback(null));
    });
}
