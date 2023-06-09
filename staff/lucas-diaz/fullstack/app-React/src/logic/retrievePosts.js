import { validators } from 'com'
import { loadUsers, loadPosts } from "../data.js";
const {validateId} = validators 

export default function retrievePosts(userId, callback) {
    validateId(userId);

    loadUsers(users => {
        const found = users.find(user => user.id === userId)

        if (!found) {
            callback(new Error(`there is no user with this current ${userId} id`));
            return
        }

        loadPosts((posts) => {
            //vamos a recorrer todos los posts
            posts.forEach(post => {
                // para c/post vamos a buscar su user propio
                const _user = users.find(user => user.id === post.author)
                //en esta propiedad, le agregamos un objeto con 3 datos mas, includio el avatar, la id y el nombre. 
                post.author = {
                    id: _user.id,
                    name: _user.name,
                    avatar: _user.avatar
                }
            })
            const _posts = posts.filter(post=> {

                if (post.author.id === userId){
                    return post.author.id === userId

                } else if (post.author.id !== userId){
                    return post.visibility === "public"
                }
            })

            callback(null, _posts.toReversed());
        })
    })
}

// de esta forma no modificamos el array original de posts, solamente modificamos la logica que almacena temporalmente estos posts con un poco mas de informacion. 
