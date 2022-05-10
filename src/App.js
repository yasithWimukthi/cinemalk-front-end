import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/HomePage/Home';
import Login from './components/pages/Login/Login'
import Nav from './components/nav_bar/nav'
import Footer from './components/footer/footer'
import Register from "./components/pages/Register/Register"
import MovieList from "./components/admin pages/Movies/MovieList";
import Theaters from "./components/admin pages/Theaters/Theaters";
import TheaterDetails from "./components/admin pages/TheaterDetails/TheaterDetails";

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
            <Route path="/" element={<Layout component={<Home/>} />} />
            <Route path="/login" element={<Layout component={<Login/>} />} />
            <Route path="/register" element={<Layout component={<Register/>} />} />
            <Route path="/movies" element={<MovieList/>} />
            <Route path="/theaters" element={<Theaters/> } />
            <Route path="/showingMovies" element={<TheaterDetails/>}  />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
