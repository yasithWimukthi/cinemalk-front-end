import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeCarousel from "./components/pages/HomePage/Carousel/Carousel";
import  Nav from "./components/nav_bar/nav"
import MovieList from "./components/admin pages/Movies/MovieList";
import TheaterDetails from "./components/admin pages/TheaterDetails/TheaterDetails";
function App() {
  return (
    <div >
      <TheaterDetails/>
    </div>
  );
}

export default App;
