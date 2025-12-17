import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/form">Form</Link>

       
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;