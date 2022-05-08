import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import movie1 from '../../../../assets/images/movie1.png'
import movie2 from '../../../../assets/images/ant_man_ver5.jpg'
import movie3 from '../../../../assets/images/whereHands.jpeg'

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
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
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ControlledCarousel;
