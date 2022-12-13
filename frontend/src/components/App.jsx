import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage/MainPage';
import RegisterPage from './RegisterPage';

const PrivateRoute = () => {
  const isAuth = localStorage.getItem('userId');
  return (
    isAuth ? <Outlet /> : <Navigate to="login" />
  );
};
// в 8 уроке указано про useLocation, с помощью которого можно задать как отобразить страницу 404
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
