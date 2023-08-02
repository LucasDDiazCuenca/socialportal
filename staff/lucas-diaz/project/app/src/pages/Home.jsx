
export default function () {

    const handleNavigateCreateAvatar = () => {
        console.log("Pending implement <Link> <Navigate> to create avatar")
    }

    const handleTemporalNavigate = () => {
        console.log("Pending implement <Link> <Navigate>")
    }

    return <div className=" w-screen h-full bg-white">
        <header className="flex justify-center border-b-2 border-zinc-100">
            <div className="logo w-16 h-16">
                <img src="./image/IsoLink-logo.png" />
            </div>
        </header>
        <main className="w-full flex flex-col items-center">
            <article className="header-card text-left max-w-md w-10/12 bg-[#f5c3ef] p-3 rounded-xl m-4">
                <p className="text-sm">
                    hi lucas,
                </p>
                <h1 className="font-bold text-xl">
                    Welcome for the first time 🎉
                </h1>
            </article>

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
                    <p><b>Emotion:</b> I'm Melting</p>
                    <p><b>Age:</b> 30 years</p>
                </div>
            </article>
        </main>

        <footer>
            <nav className="footer-menu w-full footerArea">
                <button className="cursor-pointer" onClick={handleTemporalNavigate}>
                    <img src="./icons/home.png" alt="Add Avatar" />
                </button>
                <button className="cursor-pointer" onClick={handleTemporalNavigate}>
                    <img src="./icons/friends.png" alt="Add Avatar" />
                </button>
                {/* <button className="cursor-pointer" onClick={handleTemporalNavigate}>
                    <img src="./icons/world.png" alt="Add Avatar" />
                </button> */}
                <button className="cursor-pointer" onClick={handleTemporalNavigate}>
                    <img src="./icons/profile.png" alt="Add Avatar" />
                </button>
                <button className="cursor-pointer" onClick={handleTemporalNavigate}>
                    <img src="./icons/settings.png" alt="Add Avatar" />
                </button>
            </nav>
        </footer>
    </div>
}