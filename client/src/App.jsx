import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductLIst from './pages/ProductLIst'
import ProductDetails from './pages/ProductDetails';
import Cardpage from './pages/Cardpage';
import Navbar from './components/Navbar';
import CheckoutPage from './pages/CheckoutPage';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/SignUp';

const App = () => {
  return (
    <Router>
        <Navbar /> 
      <Routes> 
            <Route path='/' element={<ProductLIst />} />
            <Route path='/product/:id/' element={<ProductDetails />} />
            <Route path='/card' element={<Cardpage />} />
            <Route element={<PrivateRoute />}>
                <Route path='/checkout' element={<CheckoutPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router> 
  )
}

export default App