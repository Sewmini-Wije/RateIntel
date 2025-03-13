import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SideNav from "./components/Sidenav";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={ <SideNav /> }>
          <Route path="/dashboard" element = { <Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
