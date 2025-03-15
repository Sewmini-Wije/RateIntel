import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {

    const navigate = useNavigate();


    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);

    const handleLogin = () => {
        if (!password) {
            setShowError(true);
        } else {
            setShowError(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-img">
                <div className="logo">
                    <h1>RateIntel</h1>
                    <h1><div className="h1-section1">.</div></h1>
                </div>
            </div>
            <div className="login-content">
                <div className="login-form">
                    <div className="lg-content">
                        <h3>Login to your account</h3>
                    </div>
                    <div className="lg-content form-content">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" />
                        <div className="pw-cont">
                            <label>Password</label>
                            {showError && <p>Please Enter Password</p>}
                            <a href="#">Forgot?</a>
                        </div>
                        <input type="password" placeholder="Enter your password" />
                    </div>
                    <div className="lg-content">
                        <button className="login-btn" onClick={() => navigate("/dashboard")} >Login now</button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Login;