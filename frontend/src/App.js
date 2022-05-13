import { BrowserRouter, Route, Routes } from "react-router-dom";


/*Pages & Components*/
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PostDetails from "./components/PostDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UpdatePasswordModal from "./components/UpdatePasswordModal";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />;
        <Route path="/auth/signup" element={<SignUp />} />;
        <Route path="/" element={<Home />} />;
        <Route path="/posts/:id" element={<PostDetails />} />;
        <Route path="/users/:id" element={<Profile />} />
        <Route path="/users/:id/password" element={<UpdatePasswordModal />} />
        <Route path="*" element={<NotFound />} />;
      </Routes>
    </BrowserRouter>
  );
};

export default App;
