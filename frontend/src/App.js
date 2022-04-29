import { BrowserRouter, Route, Routes } from "react-router-dom";

/*Pages & Components*/
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import PostDetails from "./components/PostDetails";
import Profile from "./pages/Profile";
import Connect from "./pages/Connect";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/connect" element ={<Connect/>}/>;
        <Route path="/" element={<Home />} />;
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<NotFound />} />;
      </Routes>
    </BrowserRouter>
  );
};

export default App;
