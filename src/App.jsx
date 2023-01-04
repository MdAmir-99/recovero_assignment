import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './Components/Navbar'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Footer from './Components/Footer'
import AdminDashboard from './Components/AdminDashboard'
import ShowSingleProduct from './Components/ShowSingleProduct';
// import UpdateSingleProduct from './Components/UpdateSingleProduct';
import UserDashboard from './Components/UserDashboard'
import AddMember from './Components/AddMember';

function App ()
{

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={ <Login /> } />
        <Route exact path='/login' element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/adminDashboard" element={ <AdminDashboard /> } />
        <Route path="/addmember" element={ <AddMember /> } />
        <Route path="/product/:id" element={ <ShowSingleProduct /> } />
        {/* <Route path="/updateProduct/:id" element={ <UpdateSingleProduct /> } /> */ }
        <Route path="/userDashboard" element={ <UserDashboard /> } />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
