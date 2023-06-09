import { validators } from 'com'
import { findUserById } from "../data.js";
const {validateId} = validators

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


