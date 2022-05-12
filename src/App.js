import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeCarousel from "./components/pages/HomePage/Carousel/Carousel";
import  Nav from "./components/nav_bar/nav"
import CancelReservation from "./components/pages/CancelReservationPage/CancelReservation";
function App() {
  return (
    <div >
      <CancelReservation/>
    </div>
  );
}

export default App;
