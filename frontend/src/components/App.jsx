import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={null} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
