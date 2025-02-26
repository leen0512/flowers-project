import logo from './logo.svg';
import './App.css';
import FlowersList from './pages/FlowersList';
import FlowersItem from './pages/FlowersItem';
import FlowerForm from './pages/FlowersForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className='navbar'>
    <h1>Floressa: A Floral Wonderland Awaits You</h1>
    </div>

      <BrowserRouter>
        <Routes>
          <Route path="/flowers" element={<FlowersList />} />
          <Route path="/flowers/:id" element={<FlowersItem />} />
          <Route path="/add" element={<FlowerForm />} />
          <Route path="/edit/:id" element={<FlowerForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
