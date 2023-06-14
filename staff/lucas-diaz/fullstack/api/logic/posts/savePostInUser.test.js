const savePostInUser = require("./savePostInUser")

savePostInUser("user-1", "post-2", error => {
    if(error){
        console.log(error)
        return
    }
    console.log("Post saved correctly!! 😄")
})