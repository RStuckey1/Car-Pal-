import { Outlet, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './input.css'
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Login from "./pages/Login";
import Users from "./components/Users";
import Weather from "./pages/Weather";
import Landing from "./pages/Landing";
import Vin from "./pages/VIN";

function App() {

  return (
    <>
     <Router>
        <Routes>
            <Route path='/' element={<Landing/>}/> 
            <Route path='/Vin' element={<Vin/>}/>
            <Route path='/Weather' element={<Weather/>}/>
            <Route path='/Users' element={<Users users={null}/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Footer' element={<Footer/>}/>
            <Route path='/ErrorPage' element={<ErrorPage/>}/>
            <Route path='/Home' element={<Home/>}/>
            <Route path='/Navbar' element={<Navbar/>}/>
        </Routes>
      </Router>  
      <div>
        <Navbar/>
          <main className="container pt-5">
            <Outlet/>
          </main>
      </div>
    </>
  );
}

export default App;
