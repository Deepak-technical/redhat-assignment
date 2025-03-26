import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CharacterFormPage from './pages/CharacterFormPage';
import CharacterListPage from './pages/CharacterListPage';

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <main className="">
          <Routes>
            <Route path="/" element={<CharacterListPage />} />
            <Route path="/add" element={<CharacterFormPage />} />

            
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;