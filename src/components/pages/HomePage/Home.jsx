import React from "react";
import HomeCarousel from "../../../components/pages/HomePage/Carousel/Carousel";
import Navigation from "../../nav_bar/nav";
import MovieCard from "./Movies/MovieCard";
import Footer from "../../footer/footer";

const Home = () => {
  const [load, setload] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setload(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
    
  return (
    <>
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navigation />
        <section id="#home">
          <HomeCarousel />
        </section>
        <section id="#movies">
          <MovieCard />
        </section>
        <section id="#footer">
          <Footer />
        </section>
      </div>
    </>
  );
};

export default Home;
