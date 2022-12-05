
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route, useSearchParams} from 'react-router-dom';
import AsideBar from './components/AsideBar/AsideBar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import LandingPage from './components/LandingPage/LandingPage';
import EntryTemplate from './components/EntryTemplate/EntryTemplate';
import Profile from './components/Profile/Profile';
import Popup from './components/Popup/Popup';

import NavbarLoggedIn from './components/Navbar/NavbarLoggedIn';
import {useSelector} from 'react-redux'
import {selectUser} from './components/features/userSlice'
import TitlePageTemplate from './TitlePageTemplate/TitlePageTemplate';

function App() {

  const user = useSelector(selectUser)

  return (
    <div className="App">
       <BrowserRouter>


       <Navbar />
      

      <div className='asd'>
              <AsideBar />

     
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/titlePage' element={<TitlePageTemplate />} />
      </Routes>
      </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
