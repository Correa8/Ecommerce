import { HashRouter, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Purchases from './pages/Purchases';
import ProductDetail from './pages/ProductDetail';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import ProtectedRoutes from './components/ProtectedRoutes';

const App = () => {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      {isLoading && <Loader />}
      <AppNavbar />
      <Container fluid>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<ProductDetail />} path="/product/:id" />
          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<Purchases />} path="/purchases" />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  );
};

export default App;
