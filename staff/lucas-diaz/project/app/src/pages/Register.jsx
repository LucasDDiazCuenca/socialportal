import { Canvas } from "@react-three/fiber"
import RegisterExperience from "../components/RegisterExperience"
import Form from "../components/library/Form"


export default function Register() {


    return <>
        <div className="fixed w-full h-full z-0">
            <Canvas
                shadows
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [-4.5, 3, 30]
                }}
            >
                <RegisterExperience />
            </Canvas>
        </div>
        
        <div className="w-screen h-screen mt-32" >
            <section className="text-white flex flex-row flex-wrap justify-center">
                <Form>
                    <div className="box-input sm:basis-96">
                        <label className="basis-full p-1">Username:</label>
                        <input
                            type="text"
                            className="basis-full rounded-lg p-2 pl-3 text-black bg-purple-200"
                            name="name"
                            placeholder="Enter an username"
                        />
                    </div>
                    <div className="box-input sm:basis-96">
                        <label className="basis-full p-1">Email:</label>
                        <input
                            type="email"
                            className="basis-full rounded-lg p-2 pl-3 text-black bg-purple-200"
                            name="email"
                            placeholder="Enter an email"
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
                    <button type="submit" className="form-button">Register</button>
                    <p className="basis-full text-center pt-2">Sign in</p>
                </Form>
            </section>
        </div>
    </>
} 