import {useAppContext} from "../hooks"

export default function Footer({user}) {
    const { navigate } = useAppContext()

    const handleNavigateButton = () => {
        console.log("hola")
    }

    const handleNavigatetoHome = () => {
        navigate("/login")
    }

    const handleNavigatetoEditProfile = () => {
        navigate("/profile")
    }

    const handleNavigateToFriends = () => {
        navigate("/friends")
    }

    return <footer >
        <nav className="footer-menu w-full footerArea">
            
            <button className="cursor-pointer" onClick={handleNavigatetoHome}>
                <img src="./icons/home.png" alt="Add Avatar" />
            </button>

            <button className="cursor-pointer" onClick={handleNavigateToFriends}>
                <img src="./icons/friends.png" alt="Add Avatar" />
            </button>

            {user?.avatar.length > 0 && <button className="cursor-pointer" onClick={handleNavigateButton}>
                <img src="./icons/world.png" alt="Add Avatar" />
            </button> }

            <button className="cursor-pointer" onClick={handleNavigateButton}>
                <img src="./icons/profile.png" alt="Add Avatar" />
            </button>

            <button className="cursor-pointer" onClick={handleNavigatetoEditProfile}>
                <img src="./icons/settings.png" alt="Add Avatar" />
            </button>
        </nav>
    </footer>
}

