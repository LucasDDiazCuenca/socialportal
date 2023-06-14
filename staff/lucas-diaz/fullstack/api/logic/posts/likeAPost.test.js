const likeAPost = require("./likeAPost")

likeAPost("user-2", "post-3", error => {
    if(error){
        console.log(error)
        return
    }
    console.log("Post liked/unliked correctly!! 😄")
})