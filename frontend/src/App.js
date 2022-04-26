import { BrowserRouter, Route, Routes } from "react-router-dom";

/*Pages & Components*/
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />;
        <Route path="/" element={<Home />} />;
      </Routes>
    </BrowserRouter>
  );
};

export default App;
