import logo from './logo.svg';
import './App.css';
import FlowersList from './pages/FlowersList';
import FlowerForm from './pages/FlowersForm';
import FlowerHome from './pages/FlowerHome';
import FlowersBin from './pages/FlowerBin';
import FlowerEdit from './pages/FlowerEdit';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<FlowerHome />} />
          <Route path="/flowers" element={<FlowersList />} />
          <Route path="/add" element={<FlowerForm />} />
          <Route path="/edit/:id" element={<FlowerEdit />} />
          <Route path="/bin" element={<FlowersBin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Navbar() {
  const navigate = useNavigate();
  
  return (
    <div className="navbar">
      <h1 style={{marginBottom:"5px"}}>Floressa</h1>
      <h2 style={{margin:"0px"}}>A Floral Wonderland Awaits You</h2>
      <br></br>
      <br></br>
      <p title="Discover the beauty of Floressa -ˋˏ ༻❁༺ ˎˊ-" onClick={() => navigate("/")} style={{margin:"20px",fontSize:"20px", color: "#927269", cursor:"pointer"}}>Home</p>
      <p title="Add a touch of floral magic °❀.ೃ࿔*" onClick={() => navigate("/add")} style={{margin:"20px",fontSize:"20px", color: "#927269", cursor:"pointer"}}>Bloom</p>
      <p title="Step into a floral dreamscape 𖤣.𖥧.𖡼.⚘" onClick={() => navigate("/flowers")} style={{margin:"20px",fontSize:"20px", color: "#927269", cursor:"pointer"}}>Gallery</p>
    </div>
  );
}

export default App;