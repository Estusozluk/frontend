import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import AsideBar from "./components/AsideBar/AsideBar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import LandingPage from "./components/LandingPage/LandingPage";
import EntryTemplate from "./components/EntryTemplate/EntryTemplate";
import Profile from "./components/Profile/Profile";
import Popup from "./components/Popup/Popup";

import NavbarLoggedIn from "./components/Navbar/NavbarLoggedIn";
import { useSelector } from "react-redux";
import { selectUser } from "./components/features/userSlice";
import TitlePage from "./components/TitlePage/TitlePage";

function App() {
  const user = useSelector(selectUser);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const getTokenInfo = localStorage.getItem("token");

  useEffect(() => {
    if (getTokenInfo !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [getTokenInfo]);

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && <NavbarLoggedIn />}
        {!isLoggedIn && <Navbar />}

        <div className="asd">
          <AsideBar />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/titlePage" element={<TitlePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
