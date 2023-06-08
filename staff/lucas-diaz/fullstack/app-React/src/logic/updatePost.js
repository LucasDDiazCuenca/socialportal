import { savePost, findUserById, findPostByPostId } from "../data";
import { validateId, validateText, validateUrl } from "./helpers/validators";

export default function updatePost(userId, postId, image, text, callback) {
    validateId(userId);
    validateUrl(image);
    validateText(text);

    findUserById(userId, foundUser => {

        if (!foundUser) {
            callback(new Error(`user with id ${userId} not found`));
            return;
        }

        findPostByPostId(postId, foundPost => {
            if (!foundPost) {
                callback(new Error(`post with id ${postId} not found`));
                return;
            }

            if (foundUser.id !== foundPost.author) {
                callback(new Error("The current user Id doesnt belong to post Id"));
                return
            }

            foundPost.image = image;
            foundPost.text = text;

            
            savePost(foundPost, () => callback(null));
        });
    });
}