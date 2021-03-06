import React from "react";
import MovieGrid from "./Movies/MovieGrid";
import ControlledCarousel from "./Carousel/carousel2";

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
        <section id="#home">
          <ControlledCarousel />
        </section>
        <section id="#movies" className="section-movies">
          <MovieGrid />
        </section>
        <section id="#footer">
        </section>
      </div>
    </>
  );
};

export default Home;
