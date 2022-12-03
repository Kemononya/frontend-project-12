import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import LoginPage from './LoginPage';
import NotFound from './NotFound';

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
        <Route path="/" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
