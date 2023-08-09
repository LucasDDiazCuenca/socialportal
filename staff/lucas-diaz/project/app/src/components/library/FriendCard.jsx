

export default function FriendCard({ userFriend }) {

    return <div className="flex border border-solid border-[#C8B5FF] w-full justify-between p-2 rounded-xl my-3">
        <div className="w-3/6">
            <span className="inline-flex w-3 h-3 rounded-full bg-[#F3A0A0]"></span>
            <p className="inline px-2">{userFriend}</p>
        </div>
        <p>---</p>
    </div>
}