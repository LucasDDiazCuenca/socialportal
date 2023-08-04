import retrieveUser from "../logic/retrieveUser"
import AppHeader from "../components/library/AppHeader"
import AppH1Card from "../components/library/AppH1Card"
import Footer from "../components/Footer"
import { useAppContext } from "../hooks"
import logOutUser from "../logic/logOutUser.js"

import { useEffect, useState } from "react"


export default function EditProfile() {
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



    const handleLogOutClick = () => {
        logOutUser()
        navigate("/login")
    }

    return <div className=" w-screen h-full bg-white">
        <AppHeader />
        <main className="w-full flex flex-col items-center">
            <AppH1Card user={user} type={"profile"} />

            <section className="flex flex-col flex-wrap w-full">

                <form className="w-full flex flex-col items-center mt-4">
                    <div className="w-11/12 flex flex-col items-center">
                        <div className="flex flex-col w-full sm:w-80">
                            <label className="mb-2" >Username:</label>
                            <input className="border-2 border-solid border-[#A4A4A4] sm:w-80 p-2 rounded-xl" type="text" name="userName" placeholder="Username" />
                        </div>

                        <button className="bg-[#452b8e] text-white p-2 mt-3 w-10/12 sm:w-80 rounded-xl" type="submit" >Save</button>
                    </div>
                </form>

                <form className="w-full flex flex-col items-center mt-8">
                    <div className="w-11/12 flex flex-col items-center">
                        <div className="flex flex-col w-full sm:w-80">
                            <label className="p-2">Current password:</label>
                            <input className="border-2 border-solid border-[#A4A4A4] sm:w-80 p-2 rounded-xl" type="password" name="password" placeholder="User password" />
                        </div>

                        <div className=" flex flex-col w-full sm:w-80">
                            <label className="p-2">New password:</label>
                            <input className="border-2 border-solid border-[#A4A4A4] sm:w-80 p-2 rounded-xl" type="password" name="newPassword" placeholder="New password" />
                        </div>

                        <div className=" flex flex-col w-full sm:w-80">
                            <label className="p-2">New password repetition:</label>
                            <input className="border-2 border-solid border-[#A4A4A4] sm:w-80 p-2 rounded-xl" type="password" name="newPasswordRepetition" placeholder="New password repetition" />
                        </div>

                        <button className="bg-[#452b8e] text-white p-2 mt-3 w-10/12 sm:w-80 rounded-xl" type="submit">Save</button>
                    </div>
                </form>

                <div className="flex flex-col items-center mt-10">
                    <button className="text-red-600 font-bold" onClick={handleLogOutClick}>Log Out <img className="inline" src="./icons/logOut.png" /></button>
                </div>
            </section>
        </main>
        <Footer />
    </div>
}