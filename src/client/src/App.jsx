import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Footer from './Components/Footer'
import Dashboard from './Components/Dashboard'
import AddProduct from './Components/AddProduct'
import ShowSingleProduct from './Components/ShowSingleProduct';
import UpdateSingleProduct from './Components/UpdateSingleProduct';

function App() {

  return (      
      <Router>
      <Navbar />
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/product/:id" element={<ShowSingleProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateSingleProduct />} />
        </Routes>
        <Footer />
      </Router>
  )
}

export default App
