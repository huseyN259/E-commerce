import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "./cart/Cart";
import NotFound from "./error/NotFound";
import Login from "./login/Login";
import MainPage from "./mainpage/MainPage";
import Product from "./product/Product";
import Register from "./register/Register";
import Context from "./context/GlobalContext";
import { useContext } from "react";
import { useCookieContext } from "./context/CookieContext";

function App()
 {
  const { cookies } = useCookieContext()
  const { isTokenExpired } = useContext(Context)
  const isAuthenticated = cookies.accessToken && !isTokenExpired(cookies.accessToken) 
  ? true : false;


  return (
    <>
        <Routes>

          <Route path="/" element={<Navigate to="/login" replace />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/mainpage"
            element={isAuthenticated ? <MainPage /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/product/:id"
            element={isAuthenticated ? <Product /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="/login" replace />}
          />

          <Route path="*" element={<NotFound/>}></Route>
          
        </Routes>
    </>
  )
}

export default App
