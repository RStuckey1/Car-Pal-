// import Login from './pages/Login';
import Footer from './pages/Footer';
import NavBar from './pages/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <div>
      <NavBar />
      <main className='container pt-5'>
              <Outlet />

      </main>
      <Footer />
    </div>
    </>
  );
}

export default App;
