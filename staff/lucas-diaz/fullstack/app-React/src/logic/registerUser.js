import { validators } from 'com'
import { loadUsers, saveUsers, findUserByEmail } from "../data.js";
const {validateEmail, validateUsername, validatePassword} = validators

export default function registerUser(userName, email, password, callback) {
    validateUsername(userName);
    validateEmail(email);
    validatePassword(password);

    findUserByEmail(email, foundUser => {
        if (foundUser) {
            callback(new Error("This profile already exist"));
            return;
        }
        
        let id = "user-1";

        loadUsers(users => {
            const lastUser = users.at(-1);

            if (lastUser)
                id = "user-" + (parseInt(lastUser.id.slice(5)) + 1)

            users.push({
                id,
                name: userName,
                email: email,
                password: password,
                avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
                savedPosts: []
            });
            saveUsers(users,() => callback(null));
        })
    });
}
