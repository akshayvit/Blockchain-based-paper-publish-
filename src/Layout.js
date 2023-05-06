import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { luser } from "./App";
import { loguser } from "./Login";
export const Layout=()=>{
    const user=useContext(luser);
    console.log(user);
    return <>
    <nav className="navbar navbar-expand-sm bg-dark justify-content-center">
      <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
    Ahha a Stomeo Welcomes you
    </span>
        <ul className="p-1 navbar-nav">
            <li className="nav-item active nav-link">
                <Link to="/">{user || "Login"}</Link>
            </li>
            <li className="nav-item nav-link">
                <Link to="/Sign-up">Signup</Link>
            </li>
            <li className="nav-item nav-link">
                <Link to="/Forgot-pass">Forgot Password?</Link>
            </li>
            <li className="nav-item nav-link">
                <Link to="/wallet">Visit Wallet</Link>
            </li>
            
        </ul>
    </nav>
    <Outlet/>
    </>
};