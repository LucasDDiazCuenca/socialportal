module.exports = {
    registerUser: require("./users/registerUser"),
    authenticateUser: require("./users/authenticateUser"),
    retrieveUser: require("./users/retrieveUser"),
    updateUserPassword: require("./users/updateUserPassword"),
    updateUserUsername: require("./users/updateUserUsername"), 
    sendFriendRequest: require("./users/sendFriendRequest")
}