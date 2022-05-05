import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isExpired } from "react-jwt";

/*Pages & Components*/
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PostDetails from "./components/PostDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { loginContext } from "./context/context";
import UpdatePasswordModal from "./components/UpdatePasswordModal";

const App = () => {
  /*States*/
  const [isLogged, setIsLogged] = useState(null);

  /**
   * Check if a token exists in LS
   * Verify user authentification
   * If it does:
   *  get the token
   *  decode it
   *  verify if it's still valid
   * */
  const isAuthenticated = () => {
    const checkToken = localStorage.getItem("user");
    if (!checkToken) return setIsLogged(null);

    const token = JSON.parse(checkToken);
    const isTokenExpired = isExpired(token.token);
    if (token.token === null || isTokenExpired) {
      localStorage.clear();
      console.log("token");
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  };

  useEffect(isAuthenticated, [isLogged]);

  return (
    <loginContext.Provider value={{ isLogged, setIsLogged }}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<Login />} />;
          <Route path="/auth/signup" element={<SignUp />} />;
          <Route element={<ProtectedRoute data={{ isAuthenticated }} />}>
            <Route path="/" element={<Home />} />;
            <Route path="/posts/:id" element={<PostDetails />} />;
            <Route path="/users/:id" element={<Profile />} />
            <Route path="/users/:id/password" element={<UpdatePasswordModal />} />
            <Route path="*" element={<NotFound />} />;
          </Route>
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  );
};

export default App;
