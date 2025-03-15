import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Sidenav.css";
import { faThLarge, faComments, faArrowRotateBack } from "@fortawesome/free-solid-svg-icons";
import { IoMdLogOut } from "react-icons/io"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import docProfile1 from "../img/Profile.jpg";

const user = {
    name: "Dea Fernandis",
    profilePic: docProfile1
};

const Sidenav = () => {

    const navigate = useNavigate();
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

    const handleLogout = () => {
        setOpenLogoutDialog(true);
    };

    const confirmLogout = () => {
        setOpenLogoutDialog(false);
        navigate("/");
    };

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
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <tr>
                                <td className="sidenav-icon">
                                    <FontAwesomeIcon icon={faThLarge} className="nav-icon" />
                                </td>
                                <td className="sidenav-name">Dashboard</td>
                            </tr>
                        </NavLink>
                        <NavLink to="/reviews" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <tr>
                                <td className="sidenav-icon">
                                    <FontAwesomeIcon icon={faComments} className="nav-icon" />
                                </td>
                                <td className="sidenav-name">Reviews</td>
                            </tr>
                        </NavLink>
                        <tr onClick={handleLogout} className="nav-link">
                            <td className="sidenav-icon">
                                <IoMdLogOut height={100} width={100} className="nav-icon" />
                            </td>
                            <td className="sidenav-name">Logout</td>
                        </tr>

                    </table>

                    <div className="logo">
                        <h1>Rateintel</h1><h1 className="h1-section1">.</h1>
                    </div>
                </nav>
            </aside>

            <main className="content">
                <Outlet />
            </main>

            <Dialog
                open={openLogoutDialog}
                onClose={() => setOpenLogoutDialog(false)}
                sx={{
                    "& .MuiDialog-paper": {
                        width: "400px",
                        height: "200px",
                        borderRadius: "10px",
                        padding: "20px"
                    }
                }}
            >
                <DialogTitle sx={{ fontSize: "30px", color: "#022f46", fontWeight: "bold", textAlign: "center" }}>
                    Logout Confirmation
                </DialogTitle>
                <DialogContent sx={{ textAlign: "center", color: "gray", fontSize: "16px" }}>
                    Are you sure you want to logout?
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>

                    <Button
                        onClick={confirmLogout}
                        sx={{
                            backgroundColor: "#022f46",
                            color: "white",
                            "&:hover": { backgroundColor: "#04557f" }
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        onClick={() => setOpenLogoutDialog(false)}
                        sx={{
                            backgroundColor: "gray",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#DCDCDC" }
                        }}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default Sidenav;