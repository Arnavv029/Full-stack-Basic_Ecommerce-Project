import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductLIst from './pages/ProductLIst'
import ProductDetails from './pages/ProductDetails';
import Cardpage from './pages/Cardpage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
        <Navbar /> 
      <Routes> 
            <Route path='/' element={<ProductLIst />} />
            <Route path='/product/:id/' element={<ProductDetails />} />
            <Route path='/card' element={<Cardpage />} />
      </Routes>
    </Router> 
  )
}

export default App