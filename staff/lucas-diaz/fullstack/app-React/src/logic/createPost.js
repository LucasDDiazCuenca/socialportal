import { validators } from 'com'
import { loadPosts, savePosts, findUserById } from "../data.js";
const {validateId, validateUrl, validateText } = validators

export default function createPost(userId, image, text, callback) {
    validateId(userId);
    validateUrl(image);
    validateText(text);

    findUserById(userId, foundUser => {

        if (!foundUser) {
            callback(new Error(`user with id ${userId} not found`));
            return;
        }

        loadPosts(_posts => {
            
            let id = "post-1";
            const lastPost = _posts.at(-1);
            if (lastPost) {
                id = "post-" + (parseInt(lastPost.id.slice(5)) + 1)
            }
            const post = {
                id,
                author: userId,
                userName: foundUser.name,
                image,
                text,
                date: new Date,
                likeCounter: [],
                visibility: "public"
            }
            _posts.push(post);

            savePosts(_posts, () => callback(null));

        })
    });
}