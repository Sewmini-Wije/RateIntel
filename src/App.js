import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SideNav from "./components/Sidenav";
import Dashboard from "./components/Dashboard";
import Reviews from "./components/Reviews";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={ <SideNav /> }>
          <Route path="/dashboard" element = { <Dashboard />} />
          <Route path="/reviews" element = { <Reviews /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
