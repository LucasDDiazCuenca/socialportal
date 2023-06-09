import { validators } from 'com'
import { findUserById } from "../data";
const {validateId} = validators

// NOS DA EL USER SIN PASSWORD NI EMAIL , PARA ELLO LO HACEMOS CON UN FIND(() => {})

export default function retrieveUser(userId, callback) {
    validateId(userId);
    findUserById(userId, user => {
        if (!user){
            callback(new Error("User not found"));
            return;
        } 

        const _user = {
            name: user.name,
            avatar: user.avatar,
            savedPosts: user.savedPosts
        }
        callback(null, _user);

    });

}