import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { decodeToken, isExpired } from "react-jwt";
import LoginContext from "./context/logContext";

/*Pages & Components*/
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PostDetails from "./components/post/PostDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  const [isLogged, setIsLogged] = useState(null);
  const [token, setToken] = useState(null);

  const isAuth = () => {
    const verifyToken = localStorage.getItem("user");

    if (!verifyToken) {
      setIsLogged(false);
      setToken(null);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const expiredToken = isExpired(token);
    const decodedToken = decodeToken(token);

    /*if the token can't be decoded or the token is expired
     * states are set to null
     * localStorage is clear then
     */
    if (!decodedToken || expiredToken) {
      setIsLogged(false);
      setToken(null);
      localStorage.clear();
      return;
    }

    if (decodedToken && !expiredToken) {
      setIsLogged(true);
      setToken(token);
    }
  };

  useEffect(isAuth, [isLogged]);

  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged, token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<Login />} />;
          <Route path="/auth/signup" element={<SignUp />} />;
          <Route element={<ProtectedRoutes data={{ isAuth }} />}>
            <Route path="/" element={<Home />} />;
            <Route path="/posts/:id" element={<PostDetails />} />;
            <Route path="/users/:id" element={<Profile />} />
            <Route path="*" element={<NotFound />} />;
          </Route>
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
};

export default App;
