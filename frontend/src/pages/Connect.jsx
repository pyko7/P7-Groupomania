import { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";

const Connect = () => {
/*defines which page is displayed*/
const [login, setLogin] = useState(true);
return (
    <main className="connect-modal">
        {/* Login page is displayed as default */}
        {login ? <Login/> : <Register/>}
    </main>
);
};

export default Connect;
