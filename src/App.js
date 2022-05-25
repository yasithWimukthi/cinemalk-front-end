import './App.css';
import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/HomePage/Home';
import Cart from './components/pages/Cart/Cart'
import Login from './components/pages/Login/Login'
import Nav from './components/nav_bar/Nav'
import Footer from './components/footer/Footer'
import Register from "./components/pages/Register/Register"
import MovieList from "./components/admin pages/Movies/MoviesTable";
import Theaters from "./components/admin pages/Theaters/TheatersTable";
import ReservationCancel from "./components/pages/CancelReservationPage/Reservations/ReservationCancel";
import Dashboard from "./components/admin pages/DashBoard/DashLayout"


const Layout =(props)=>{
  return(
      <div>
          <Nav />
          {props.component}
          <Footer />
      </div>
  )
}


function App() {
  return (
    < >
      <BrowserRouter>
      <Routes>
            <Route path="/" element={<Layout component={<Home />}/>} />
            <Route path="/cart" element={<Layout component={<Cart />}/>} />
            <Route path="/login" element={<Layout component={<Login/>} />} />
            <Route path="/register" element={<Layout component={<Register/>} />} />
            <Route path="/reservations" element={<Layout component={<ReservationCancel/>} />} />
            <Route path ="/dash-board">
                <Route path="movies" element={<Dashboard component={<MovieList />}/>} />
                <Route path="theaters" element={<Dashboard component={<Theaters/> }/>} />
            </Route>
      </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
