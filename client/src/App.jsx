import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductLIst from './pages/ProductLIst'
import ProductDetails from './pages/ProductDetails';

const App = () => {
  return (
    <Router>
      <Routes> 
            <Route path='/' element={<ProductLIst />} />
            <Route path='/product/:id/' element={<ProductDetails />} />
      </Routes>
    </Router> 
  )
}

export default App