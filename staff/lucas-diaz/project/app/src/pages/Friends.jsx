import AppHeader from "../components/library/AppHeader"
import AppH1Card from "../components/library/AppH1Card"
import Footer from "../components/Footer"

import retrieveUser from "../logic/retrieveUser"
import { useEffect, useState } from "react"


export default function Friends() {
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

    return <div className=" w-screen h-full bg-white pb-28">
        <AppHeader />
        <main className="w-full flex flex-col items-center">
            <AppH1Card user={user} type={"friends"} />

            <section className="w-11/12 sm:w-96">
                <h2 className="text-lg font-bold my-3">My friends</h2>

                <div className="flex border border-solid border-[#C8B5FF] w-full justify-between p-2 rounded-xl my-3">
                    <div className="w-3/6">
                        <span className="inline-flex w-3 h-3 rounded-full bg-[#F3A0A0]"></span>
                        <p className="inline px-2">Romuro</p>
                    </div>
                    <p>---</p>
                </div>

                <div className="flex border border-solid border-[#C8B5FF] w-full justify-between p-2 rounded-xl my-3">
                    <div className="w-3/6">
                        <span className="inline-flex w-3 h-3 rounded-full bg-[#F3A0A0]"></span>
                        <p className="inline px-2">Laila</p>
                    </div>
                    <p>---</p>
                </div>

                <div className="flex border border-solid border-[#C8B5FF] w-full justify-between p-2 rounded-xl my-3">
                    <div className="w-3/6">
                        <span className="inline-flex w-3 h-3 rounded-full bg-[#5EEFB2]"></span>
                        <p className="inline px-2">Manuel</p>
                    </div>
                    <p>Violet Room</p>
                </div>
            </section>

            <section className="w-11/12 sm:w-96">
                <h2 className="text-lg font-bold my-3">Friends Editor</h2>

                <article className="w-full">
                    <form className="w-full my-4">
                        <label>Add a friend</label>
                        <div className="flex gap-3 w-full mt-2">
                            <input className="border border-solid border-[#A4A4A4] rounded-lg pl-2 w-10/12" type="text" name="addfriend" placeholder="---" />
                            <button className="inline-block">
                                <img src="./icons/addPlus.png" alt="Agregar amigo" />
                            </button>
                        </div>
                    </form>

                    <form className="w-full my-4">
                        <label>Delete a friend</label>
                        <div className="flex gap-3 w-full mt-2">
                            <input className="border border-solid border-[#A4A4A4] rounded-lg pl-2 w-10/12" type="text" name="addfriend" placeholder="---" />
                            <button className="inline-block">
                                <img src="./icons/rubbish.png" alt="Agregar amigo" />
                            </button>
                        </div>
                    </form>
                </article>

                <article className="w-full">
                    <h3 className="font-bold">Friend requests</h3>

                    <div>
                        <div className="flex justify-between items-center my-3">
                            <p>ValentinRatKid</p>
                            <div className="flex items-center justify-between w-3/12">
                                <button className="inline-block w-8 h-8">
                                    <img src="./icons/addFriend.png" alt="Agregar amigo" />
                                </button>
                                <button className="inline-block w-8 h-8">
                                    <img src="./icons/deleteFriend.png" alt="Agregar amigo" />
                                </button>
                            </div>
                        </div>
                        <hr />
                    </div>

                    <div>
                        <div className="flex justify-between items-center my-3">
                            <p>ValentinRatKid</p>
                            <div className="flex items-center justify-between w-3/12">
                                <button className="inline-block w-8 h-8">
                                    <img src="./icons/addFriend.png" alt="Agregar amigo" />
                                </button>
                                <button className="inline-block w-8 h-8">
                                    <img src="./icons/deleteFriend.png" alt="Agregar amigo" />
                                </button>
                            </div>
                        </div>
                        <hr />
                    </div>

                    <div>
                        <div className="flex justify-between items-center my-3">
                            <p>ValentinRatKid</p>
                            <div className="flex items-center justify-between w-3/12">
                                <button className="inline-block w-8 h-8">
                                    <img src="./icons/addFriend.png" alt="Agregar amigo" />
                                </button>
                                <button className="inline-block w-8 h-8">
                                    <img src="./icons/deleteFriend.png" alt="Agregar amigo" />
                                </button>
                            </div>
                        </div>
                        <hr />
                    </div>

                    <div>
                        <div className="flex justify-between items-center my-3">
                            <p>ValentinRatKid</p>
                            <div className="flex items-center justify-between w-3/12">
                                <button className="inline-block w-8 h-8">
                                    <img src="./icons/addFriend.png" alt="Agregar amigo" />
                                </button>
                                <button className="inline-block w-8 h-8">
                                    <img src="./icons/deleteFriend.png" alt="Agregar amigo" />
                                </button>
                            </div>
                        </div>
                        <hr />
                    </div>

                    <div>
                        <div className="flex justify-between items-center my-3">
                            <p>ValentinRatKid</p>
                            <div className="flex items-center justify-between w-3/12">
                                <button className="inline-block w-8 h-8">
                                    <img src="./icons/addFriend.png" alt="Agregar amigo" />
                                </button>
                                <button className="inline-block w-8 h-8">
                                    <img src="./icons/deleteFriend.png" alt="Agregar amigo" />
                                </button>
                            </div>
                        </div>
                        <hr />
                    </div>
                </article>
            </section>
        </main>
        <Footer />
    </div>
}