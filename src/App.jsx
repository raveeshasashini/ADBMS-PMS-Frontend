import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import LoginPage from "./components/auth/LoginPage"
import Navbar_Slider from "./components/common/Navbar/Navbar_Slider";
import UserList from "./components/common/UserManagement/UserList";
import Branches from "./pages/Branch Management/Branches";


function App() {

  

  const AppLayout = () =>{
    const location = useLocation();
    const isLoginPage = location.pathname === '/login' || location.pathname === '/';

    return(
      <>
        {!isLoginPage && <Navbar_Slider/>}
        <Routes>

          {/* login */}
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          
          {/* user management */}
          <Route path="/user-management" element={<UserList/> } />

          {/* Branch Management routings ---------------START */}
          <Route path="/branches" element={<Branches/> } />

          {/* Branch Management routings ---------------END */}


        </Routes>
      </>
    )
  }

  return (
    <>
      <BrowserRouter>
        <AppLayout/>
      </BrowserRouter>
    
    </>
  )
}

export default App
