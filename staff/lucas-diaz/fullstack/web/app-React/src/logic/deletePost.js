import { validateId } from "./helpers/validators";
import { loadUsers, loadPosts, savePosts } from "../data";


export default function deletePost(userId, postId, callback) {
    validateId(userId);

    loadUsers(foundUser => {
        const found = foundUser.some(user => user.id === userId)

        if (!found){
            callback(new Error(`there is no user with this current ${userId} id`));
            return;
        } 

        loadPosts( _posts => {

            const foundPostIndex = _posts.findIndex(post => post.id === postId)

            if (foundPostIndex !== -1) {
                _posts.splice(foundPostIndex, 1);
            }
    
            savePosts(_posts, () => callback(null))

        } )
    })
}
