import { NavLink, Outlet } from "react-router-dom";
import "../styles/Sidenav.css";
import { faThLarge, faComments, faUserGroup, faArrowRotateBack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import docProfile1 from "../img/Profile.jpg";

const user = {
    name: "Dea Fernandis",
    profilePic: docProfile1 
};

const Sidenav = () => {

    return (
        <div className="layout-container">
            <aside className="side-nav">
                <nav>
                    <ul>
                        <li className="py-2 user-data">
                            <img src={user.profilePic} alt="User" className="user-img" />
                            <h2 className="user-name"> {user.name} </h2>
                        </li>
                    </ul>
                    
                    <table className="sidenav-table">
                        <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            <tr>
                                <td className="sidenav-icon">
                                    <FontAwesomeIcon icon={faThLarge} className="nav-icon" />
                                </td>
                                <td className="sidenav-name">Dashboard</td>
                            </tr>
                        </NavLink>
                        <NavLink to="/patient_details" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                            <tr>
                                <td className="sidenav-icon">
                                    <FontAwesomeIcon icon={faComments} className="nav-icon" />
                                </td>
                                <td className="sidenav-name">Reviews</td>
                            </tr>
                        </NavLink>
                        <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} >
                        <tr>
                                <td className="sidenav-icon">
                                    <FontAwesomeIcon icon={faArrowRotateBack} className="nav-icon" />
                                </td>
                                <td className="sidenav-name">Logout</td>
                            </tr>
                        </NavLink>
                    </table>

                    <div className="logo">
                        <h1>Rateintel</h1><h1 className="h1-section1">.</h1>
                    </div>
                </nav>
            </aside>

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};

export default Sidenav;