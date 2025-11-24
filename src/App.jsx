import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ForumList from './pages/ForumList';
import CreatePost from './pages/CreatePost';
import ForumPost from './pages/ForumPost';
import IMC from './pages/IMC';
import Calorias from './pages/Calorias';
import ForumUpdate from './pages/ForumUpdate';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forum" element={<ForumList />} />
        <Route path="/forum/novo" element={<CreatePost />} />
        <Route path="/forum/:id" element={<ForumPost />} />
        <Route path="/forum/update/:id" element={<ForumUpdate />} />
        <Route path="/imc" element={<IMC />} />
        <Route path="/calorias" element={<Calorias />} />
      </Routes>
    </BrowserRouter>
  );
}
