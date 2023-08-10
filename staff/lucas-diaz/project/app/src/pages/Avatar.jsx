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
    const [selectedEmotions, setSelectedEmotions] = useState({
        clap: false,
        dance: false,
        dead: false,
        laugh: false,
        victory: false,
        wave: false
    });

    let model = ""
    let colors

    console.log(selectedEmotions)

    const toggleBoyAvatarImg = () => {
        setboyClicked(true)
        setGirlClicked(false)
        model = "./models/boy.glb"
        console.log(model)
    }

    const toggleGirlAvatarImg = () => {
        setGirlClicked(true)
        setboyClicked(false)
        model = "./models/girl.glb"
        console.log(model)
    }

    const handleCreateAvatar = () => {
        try {
            (async() => {
                
            })()
        } catch (error) {
            console.log(error)
        }

        //llevarle a la pagina principal
    }

    const handleRetrieveModelInformation = (info) => {
        colors = info
        console.log(colors)
    }

    const toggleEmotion = (emotion) => {
        const selectedCount = Object.values(selectedEmotions).filter(value => value).length
        if (!selectedEmotions[emotion] && selectedCount >= 3) {
            return
        }
        setSelectedEmotions(prevState => ({
            ...prevState,
            [emotion]: !prevState[emotion]
        }));
    };
    

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
                        {boyClicked && <BoyBackgroundExperience active={boyClicked} info={handleRetrieveModelInformation}/>}
                    </Canvas> : <img src="./image/avatarPlaceHolder.png" />}
                </div >

            </section>
            {/* <section className="w-11/12 sm:w-96"></section> */}
            <section className="w-11/12 sm:w-96">
                <h2 className="text-lg font-bold my-3">Select emotions:</h2>
                <p className="pb-3">Select 3 from this 6 emotions</p>
                <div className="flex flex-wrap justify-around gap-2">
                {Object.keys(selectedEmotions).map(emotion => (
                    <button
                        key={emotion}
                        className={`w-28 ${selectedEmotions[emotion] ? "border-2 border-solid border-[#5EEFB2] rounded-2xl" : ""}`}
                        onClick={() => toggleEmotion(emotion)}
                    >
                        <img src={`./icons/emotions/${emotion}.png`} alt={`${emotion} icon`} />
                    </button>
                ))}
                </div>
            </section>

            <button className="bg-[#452b8e] text-white p-2 mt-10 w-10/12 sm:w-80 rounded-xl" type="submit" onClick={handleCreateAvatar} >{user?.avatar.length > 0 ? "Modify avatar" : "Create avatar"}</button>
        </main>
        <Footer />
    </div>
}