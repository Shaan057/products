import './App.css';
import { Route, Routes } from 'react-router-dom';
import Products from './components/products';
import ProductsDetails from './components/productsDetails';

const App = () => (
    <Routes>
        <Route exact path='/' element={<Products />} />
        <Route path='/:id' element={<ProductsDetails />} />
    </Routes>
);

export default App;
