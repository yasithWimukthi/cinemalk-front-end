import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import movie1 from '../../../../assets/images/movie1.png'
import movie2 from '../../../../assets/images/ant_man_ver5.jpg'
import movie3 from '../../../../assets/images/whereHands.jpeg'

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="carousel-wrapper">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={movie1}
          alt="First slide"
          height="500px"
          
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={movie3}
          alt="Second slide"
          height="500px"
        />

        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={movie2}
          alt="Third slide"
          height="500px"
        />

        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ControlledCarousel;
