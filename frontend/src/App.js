import logo from './logo.svg';
import './App.css';
import FlowersList from './pages/FlowersList';
import FlowersItem from './pages/FlowersItem';
import FlowerForm from './pages/FlowersForm';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/flowers" element={<FlowersList />} />
          <Route path="/flowers/:id" element={<FlowersItem />} />
          <Route path="/add" element={<FlowerForm />} />
          <Route path="/edit/:id" element={<FlowerForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar_icons">
        <img
          onClick={() => navigate("/add")}
          src="/images/plusIcon.png"
          alt="Plus icon"
          title="Add a touch of floral magic °❀.ೃ࿔*"
          className="navbar_icon"
        />
        <img
          onClick={() => navigate("/flowers")}
          src="/images/magnifyingGlass.png"
          alt="Magnifying glass"
          title="Step into a floral dreamscape 𖤣.𖥧.𖡼.⚘"
          className="navbar_icon"
        />
      </div>
      <h1>Floressa: A Floral Wonderland Awaits You</h1>
    </div>
  );
}

export default App;