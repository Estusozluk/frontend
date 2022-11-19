
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AsideBar from './components/AsideBar/AsideBar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Navbar />
      <AsideBar />

     
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
