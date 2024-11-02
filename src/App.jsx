import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./components/auth/LoginPage"

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>

          {/* login */}
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />

          {/*  */}

        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
