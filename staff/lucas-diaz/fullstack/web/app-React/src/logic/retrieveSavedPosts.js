import { validateId } from "./helpers/validators.js";
import { findUserById } from "../data.js";


export default function retrieveSavedPosts(userId, posts, callback) {
    validateId(userId);

    findUserById(userId, foundUser => {

    if (!foundUser){
        callback(new Error(`there is no user with this current ${userId} id`));
        return;
    } 

    if (foundUser.savedPosts.length > 0) {
        const savedPosts = posts.filter((post) => foundUser.savedPosts.includes(post.id));

        callback(null,savedPosts);
    } else {
        callback(null, []);
    }

    });

}