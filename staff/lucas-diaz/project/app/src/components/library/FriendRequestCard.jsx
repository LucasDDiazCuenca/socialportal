import addFriend from "../../logic/addFriend"
import deleteFriendRequest from "../../logic/deleteFriendRequest.js"



export default function FriendRequestCard({ userFriendRequest, onFriendAdded, onFriendDeleted }) {

    const handleAddFriend = async () => {
        try {
            await addFriend(userFriendRequest)
            console.log("friend added")
            onFriendAdded()
        } catch (error) {
            console.log(error)
        }
    };

    const handleDeleteFriendRequest = async () => {
        try {
            await deleteFriendRequest(userFriendRequest)
            console.log("friend request deleted")
            onFriendDeleted()
        } catch (error) {
            console.log(error)
        }
    }

    return <div>
        <div className="flex justify-between items-center my-3">
            <p>{userFriendRequest}</p>
            <div className="flex items-center justify-between w-3/12">
                <button className="inline-block w-8 h-8" onClick={handleAddFriend}>
                    <img src="./icons/addFriend.png" alt="add friend button" />
                </button>
                <button className="inline-block w-8 h-8" onClick={handleDeleteFriendRequest}>
                    <img src="./icons/deleteFriend.png" alt="delete friend request button" />
                </button>
            </div>
        </div>
        <hr />
    </div>
}