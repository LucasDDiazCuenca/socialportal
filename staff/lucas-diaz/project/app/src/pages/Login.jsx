import Form from "../components/library/Form"
import { Canvas } from '@react-three/fiber'
import Introduction from "../components/Introduction"


export default function Register() {

    const handleLogin = event => {
        event.preventDefault()
        console.log("go to home")

        const email = event.target.email.value
        const password = event.target.password.value

        console.log(email)
        console.log(password)
    }

    return <>
        <div className="fixed w-screen h-5/6 top-52 z-0">
            <Canvas
                className="z-0 fixed w-full h-80"
                shadows
                camera={{
                    fov: 80,
                    near: 0.1,
                    far: 200,
                    position: [0, 2, 5]
                }}
            >
                <Introduction />
            </Canvas>
        </div>

        <div className="w-screen h-screen bg-[#452b8e]">
            <section className="text-white flex flex-row flex-wrap justify-center">
                <div className="w-3/4 h-60 sm:w-1/3 sm:h-64 bg-cover bg-center bg-image flex items-center justify-center" >
                    <h1 className="text-center text-5xl font-bold">Iso Link</h1>
                </div>
                <Form onSubmit={handleLogin}>
                    <div className="box-input sm:basis-96">
                        <label className="basis-full p-1">Email:</label>
                        <input
                            type="email"
                            className="basis-full rounded-lg p-2 pl-3 text-black bg-purple-200"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="box-input sm:basis-96">
                        <label className="basis-full p-1">Password:</label>
                        <input
                            type="password"
                            className="basis-full rounded-lg p-2 pl-3 text-black bg-purple-200"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="form-button">Login</button>
                    <p className="basis-full text-center pt-2">Go to register</p>
                </Form>
            </section>
        </div>

    </>
}