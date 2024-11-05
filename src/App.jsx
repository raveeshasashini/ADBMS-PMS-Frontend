import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import LoginPage from "./components/auth/LoginPage"
import Navbar_Slider from "./components/common/Navbar/Navbar_Slider";
import UserList from "./components/UserManagement/UserList";
import NotFoundPage from "./pages/common/NotFoundPage";


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
      

          {/* dash board */}
          <Route path="/landing-page" />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage/>}/>

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
