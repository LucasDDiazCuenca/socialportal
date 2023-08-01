import Login from "./pages/Login"
import Register from "./pages/Register"
import AppContext from "./AppContext"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import isUserLoggedIn from "./logic/isUserLoggedIn"


const { Provider } = AppContext

function App() {
  const navigate = useNavigate()

  // return <Provider value={navigate}>
  //   <Routes>
  //     <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
  //     <Route path="/register" element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />



  //   </Routes>
  // </Provider>

  return<Login/>
}

export default App
