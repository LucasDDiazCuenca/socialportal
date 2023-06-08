import { savePost, findUserById, findPostByPostId } from "../data";
import { validateId } from "./helpers/validators";


export default function likeAPost(userId, post, callback) {
    validateId(userId);

    findUserById(userId, foundUser => {

        findPostByPostId(post.id, foundPost => {

            if (!foundUser) {

                callback(new Error("There is no user with this id"));
                return;
            }
            if (!foundPost) {
                callback(new Error("There is no post with this post id"))
                return
            }

            if (foundPost.likeCounter.includes(foundUser.id)) {

                const foundUserIndex = foundPost.likeCounter.indexOf(foundUser.id)
                foundPost.likeCounter.splice(foundUserIndex, 1);

                savePost(foundPost, () => callback(null));
                return;
            }

            foundPost.likeCounter.push(foundUser.id);
            savePost(foundPost, () => callback(null));

        });
    });

}