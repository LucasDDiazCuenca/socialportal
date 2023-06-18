import { validators } from 'com'
const {validateId} = validators 

export default function retrievePosts(userId, callback) {
    validateId(userId);

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
    
        if (status !== 200) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)
    
            callback(new Error(error))    
            return
        }

        const { response: json } = xhr
        const posts = JSON.parse(json)
        
        callback(null, posts)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('GET',`${import.meta.env.VITE_API_URL}/posts`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

    xhr.send()
}

// de esta forma no modificamos el array original de posts, solamente modificamos la logica que almacena temporalmente estos posts con un poco mas de informacion. 
