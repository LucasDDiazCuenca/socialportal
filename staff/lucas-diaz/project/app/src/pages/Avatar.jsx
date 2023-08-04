import AppH1Card from "../components/library/AppH1Card"
import AppHeader from "../components/library/AppHeader"
import Footer from "../components/Footer"

import retrieveUser from "../logic/retrieveUser"
import { useEffect, useState } from "react"

export default function Avatar() {
    const [user, setUser] = useState(null)

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


    return <div className=" w-screen h-screen bg-white">
        <AppHeader />
        <main className="w-full flex flex-col items-center">
            <AppH1Card user={user} type={"avatar"} />
        </main>
        
        <Footer/>
    </div>
}