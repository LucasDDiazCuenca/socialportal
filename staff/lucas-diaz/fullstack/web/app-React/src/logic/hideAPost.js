import { findPostByPostId, findUserById, savePost } from "../data";
import { validateId } from "./helpers/validators";


export default function hideAPost(userId, post, callback){
    validateId(userId)

    findUserById(userId, foundUser => {
        if (!foundUser){
            callback(new Error("There is no user with this id"));
            return;
        }
        findPostByPostId(post.id , foundPost => {
            if (!foundPost) {
                callback(new Error("There is no post with this post id"))
                return
            }

            if (foundUser.id !== foundPost.author){
                callback(new Error("user id doesnt match with post author id"))
                return
            }
            if (foundPost.visibility !== "private"){
                foundPost.visibility = "private";
            } else {
                foundPost.visibility = "public";
            }
    
            savePost(foundPost, () => callback(null))
        })
    })
}