import { validators } from 'com'
const { validateId } = validators


export default function toggleLikePost(userId, postId, callback) {
    validateId(userId);
    validateId(postId)


    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr
        if (status !== 204) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))
            return
        }

        callback(null)
    }


    xhr.onerror = () => {
        callback(new Error('connection error'))
    }


    xhr.open("PATCH", `${import.meta.env.VITE_API_URL}/posts/like/${userId}/${postId}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send()

}