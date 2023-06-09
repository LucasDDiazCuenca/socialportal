import { validators } from 'com'
import { saveUser, findUserById } from "../data";
const {validateId} = validators 

export default function savePostInUser(userId, post, callback){
    validateId(userId);

    findUserById(userId, foundUser => {
        
        if (!foundUser){
            callback(new Error("There is no user with this id"));
            return
        } 

        // si lo tiene, buscarlo y eliminarlo 
        if (foundUser.savedPosts.includes(post.id)){
            const index = foundUser.savedPosts.indexOf(post.id)
            foundUser.savedPosts.splice(index,1)

            saveUser(foundUser, () => callback(null));
            return;
        }
        //si no lo tiene pushear el id del post 
        if (!foundUser.savedPosts.includes(post.id)){
            foundUser.savedPosts.push(post.id)
        }
        // guardar datos en el user
        saveUser(foundUser, () => callback(null));

    } );
}