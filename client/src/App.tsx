import Footer from './pages/Footer';
import NavBar from './pages/Navbar';
import { Outlet } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <div className="app-shell">
      <div className="App">
        <NavBar />
      </div>
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
