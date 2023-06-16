import { validators } from 'com'
const {validateId} = validators

export default function retrieveUserPosts(userId, callback) {
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

    xhr.open('GET',`http://localhost:4000/posts/users/${userId}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send()
}


