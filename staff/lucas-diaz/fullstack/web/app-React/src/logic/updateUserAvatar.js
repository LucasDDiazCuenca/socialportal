import {validateId, validateUrl } from "./helpers/validators.js"
import { saveUser, findUserById } from "../data.js";


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
