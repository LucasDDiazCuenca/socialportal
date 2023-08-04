import {useAppContext} from "../hooks"

export default function Footer({user}) {
    const { navigate } = useAppContext()

    const handleNavigateToAvatar = () => {
        navigate("/avatar")
    }

    const handleNavigateToHome = () => {
        navigate("/login")
    }

    const handleNavigateToEditProfile = () => {
        navigate("/profile")
    }

    const handleNavigateToFriends = () => {
        navigate("/friends")
    }

    const handleNavigateButton = () => {
        console.log("pending...")
    }

    return <footer >
        <nav className="footer-menu w-full footerArea">
            
            <button className="cursor-pointer" onClick={handleNavigateToHome}>
                <img src="./icons/home.png" alt="Add Avatar" />
            </button>

            <button className="cursor-pointer" onClick={handleNavigateToFriends}>
                <img src="./icons/friends.png" alt="Add Avatar" />
            </button>

            {user?.avatar.length > 0 && <button className="cursor-pointer" onClick={handleNavigateButton}>
                <img src="./icons/world.png" alt="Add Avatar" />
            </button> }

            <button className="cursor-pointer" onClick={handleNavigateToAvatar}>
                <img src="./icons/profile.png" alt="Add Avatar" />
            </button>

            <button className="cursor-pointer" onClick={handleNavigateToEditProfile}>
                <img src="./icons/settings.png" alt="Add Avatar" />
            </button>
        </nav>
    </footer>
}

