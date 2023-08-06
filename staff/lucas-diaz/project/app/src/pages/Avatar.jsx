import AppH1Card from "../components/library/AppH1Card"
import AppHeader from "../components/library/AppHeader"
import Footer from "../components/Footer"
import { Canvas } from '@react-three/fiber'
import BoyBackgroundExperience from "../components/BoyBackgroundExperience"
import GirlBackgroundExperience from "../components/GirlBackgroundExperience"

import retrieveUser from "../logic/retrieveUser"
import { useEffect, useState } from "react"


export default function Avatar() {
    const [user, setUser] = useState(null)
    const [boyClicked, setboyClicked] = useState(null)
    const [girlClicked, setGirlClicked] = useState(null)

    const toggleBoyAvatarImg = () => {
        setboyClicked(true)
        setGirlClicked(false)
    }

    const toggleGirlAvatarImg = () => {
        setGirlClicked(true)
        setboyClicked(false)
    }

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
        <main className="w-full flex flex-col items-center pb-32 bg-white">
            <AppH1Card user={user} type={"avatar"} />
            <section className="w-11/12 sm:w-96">
                <h2 className="text-lg font-bold my-3">Choose an avatar</h2>
                <div className="flex justify-around">
                    <div className={`w-36 h-40 rounded-t-full z-10 cursor-pointer ${boyClicked ? "border-2 border-solid border-[#5EEFB2]" : ""}`} onClick={toggleBoyAvatarImg}>
                        <Canvas
                            className="rounded-t-full"
                            shadows
                            camera={{
                                fov: 80,
                                near: 0.1,
                                far: 200,
                                position: [0, 0.2, 1.8]
                            }}
                        >
                            <BoyBackgroundExperience />
                        </Canvas>
                    </div>

                    <div className={`w-36 h-40 rounded-t-full z-10 cursor-pointer ${girlClicked ? "border-2 border-solid border-[#5EEFB2]" : ""}`} onClick={toggleGirlAvatarImg}>
                        <Canvas
                            className="rounded-t-full"
                            shadows
                            camera={{
                                fov: 80,
                                near: 0.1,
                                far: 200,
                                position: [0, 0.2, 1.8]
                            }}
                        >
                            <GirlBackgroundExperience />
                        </Canvas>
                    </div>
                </div>
            </section>

            <section className="w-11/12 sm:w-96 h-96">
                <h2 className="text-lg font-bold my-3">Edit Avatar:</h2>
                <div className="h-72 rounded-lg">

                    {boyClicked || girlClicked ? <Canvas
                        className="rounded-lg"
                        shadows
                        camera={{
                            fov: 80,
                            near: 0.1,
                            far: 200,
                            position: [0, 0.2, 1.8]
                        }}
                    >
                        {girlClicked && <GirlBackgroundExperience active={girlClicked} />}
                        {boyClicked && <BoyBackgroundExperience active={boyClicked} />}
                    </Canvas> : <img src="./image/avatarPlaceHolder.png" />}
                </div >

            </section>
            {/* <section className="w-11/12 sm:w-96"></section> */}
            <section className="w-11/12 sm:w-96">
                <h2 className="text-lg font-bold my-3">Select emotions:</h2>
                <p className="pb-3">Select 3 from this 6 emotions</p>
                <div className="flex flex-wrap justify-around gap-2">
                    <button className=" w-28">
                        <img src="./icons/emotions/clap.png" alt="clap icon" />
                    </button>
                    <button className="w-28">
                        <img src="./icons/emotions/dance.png" alt="clap icon" />
                    </button>
                    <button className="w-28">
                        <img src="./icons/emotions/dead.png" alt="clap icon" />
                    </button>
                    <button className="w-28">
                        <img src="./icons/emotions/laugh.png" alt="clap icon" />
                    </button>
                    <button className="w-28">
                        <img src="./icons/emotions/victory.png" alt="clap icon" />
                    </button>
                    <button className="w-28">
                        <img src="./icons/emotions/wave.png" alt="clap icon" />
                    </button>
                </div>
            </section>

            <button className="bg-[#452b8e] text-white p-2 mt-10 w-10/12 sm:w-80 rounded-xl" type="submit" >{user?.avatar.length > 0 ? "Modify avatar" : "Create avatar"}</button>
        </main>
        <Footer />
    </div>
}