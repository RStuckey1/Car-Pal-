import Footer from './pages/Footer';
import NavBar from './pages/Navbar';
import { Outlet } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <div className="container">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
