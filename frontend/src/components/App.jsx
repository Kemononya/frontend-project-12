import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage/MainPage';
import RegisterPage from './RegisterPage';
import NotFoundPage from './NotFoundPage';

const PrivateRoute = () => {
  const isAuth = localStorage.getItem('userId');
  return (
    isAuth ? <Outlet /> : <Navigate to="login" />
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
