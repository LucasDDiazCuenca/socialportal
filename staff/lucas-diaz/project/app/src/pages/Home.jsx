import AppHeader from "../components/library/AppHeader"
import AppH1Card from "../components/library/AppH1Card"
import Footer from "../components/Footer"
import retrieveUser from "../logic/retrieveUser.js"
import { useEffect, useState } from "react"
import { useAppContext } from "../hooks"


export default function () {
    const [user, setUser] = useState(null)
    const { navigate } = useAppContext()

    useEffect(() => {
        try {

            (async () => {
                const user = await retrieveUser()

                setUser(user)
            })()
        } catch (error) {
            alert(error.message)
        }
    }, [])


    const handleNavigateCreateAvatar = event => {
        event.preventDefault()
        navigate("/avatar")
    }

    return <div className=" w-screen h-screen bg-white">
        <AppHeader />
        <main className="w-full flex flex-col items-center">
            <AppH1Card user={user} type={"home"} />

            <article className="avatar-info w-full flex flex-col items-center">
                <div className="avatar-card flex justify-between text-white bg-[#452b8e] rounded-xl p-3 w-9/12 max-w-sm h-48 m-2">
                    <h2 className="font-bold text-xl w-8/12 sm:w-7/12">Create you avatar here!! 🙆🏼</h2>
                    <button className="self-end cursor-pointer" onClick={handleNavigateCreateAvatar}>
                        <img src="./icons/violetPlus.png" alt="Add Avatar" />
                    </button>
                </div>

                <div className="avatar-description w-9/12 sm:w-96 flex flex-col items-start mt-3">
                    <h2 className="font-bold text-xl">Avatar's name</h2>
                    <p><b>Personality:</b> ---</p>
                    <p><b>Emotion:</b> ---</p>
                    <p><b>Age:</b> ---</p>
                </div>
            </article>

            {user?.avatar && <button className="bg-[#452b8e] text-white p-3 w-4/6 sm:w-80 rounded-2xl mt-32">Go to room</button>}
        </main>

        <Footer user={user} />
    </div>
}