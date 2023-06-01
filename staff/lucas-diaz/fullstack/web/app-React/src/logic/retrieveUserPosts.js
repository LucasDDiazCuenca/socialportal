import { validateId } from "./helpers/validators.js";
import { findUserById } from "../data.js";

export default function retrieveUserPosts(userId, posts, callback) {
    validateId(userId);

    findUserById(userId, foundUser => {
        if (!foundUser) {
            callback(new Error(`there is no user with this current ${userId} id`));
            return;
        }

        const userPosts = posts.filter((post)=> {
            return post.author.id === foundUser.id
        })
        callback(null, userPosts);
    })
}


