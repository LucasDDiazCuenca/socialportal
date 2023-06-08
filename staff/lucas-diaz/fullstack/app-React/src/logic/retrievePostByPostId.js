import { validateId } from "./helpers/validators";
import { findPostByPostId, findUserById } from "../data";

export default function retrievePostByPostId (userId, postId, callback){
    validateId(userId);

    
    findUserById(userId, foundUser => {
        if (!foundUser) {
            callback(new Error (`there is no user with this current ${userId} id`));
            return;
        }
        

        findPostByPostId(postId, foundPost => {
            callback(null, foundPost);
        })
    })
}



