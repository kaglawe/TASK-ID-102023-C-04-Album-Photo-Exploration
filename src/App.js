import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoAlbum from './components/PhotoAlbum';
import PhotoDetails from './components/PhotoDetails';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<PhotoAlbum />} />
      <Route path="/photo/:id" element={<PhotoDetails/>} />

      </Routes>
    </Router>
  );
}

export default App;
