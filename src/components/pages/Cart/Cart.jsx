import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CartItem from "./CartItem";
import "./cart.scss";
import NavBar from "./NavBar";

const Cart = () => {
  return (
    <>
      <NavBar />
      <Container className="cart-page-wrapper">
        <h2></h2>
        <CartItem />
        <CartItem />
        <CartItem />
        {/* cart total */}
        <div className="total-price-card-wrapper">
          <Row>
            <Col sm={3} className="total-left-wrap">
            </Col >
            <Col sm={9} className="total-right-wrap">
            <div className="total-right-card1">
                <h6 >Ticket price: </h6>
                <h6 >RS. 500.00</h6>
              </div>
            <div className="total-right-card1">
                <h6 >No of bookings: </h6>
                <h6 >3</h6>
              </div>
              <div className="total-right-card">
                <h6 >Total price: </h6>
                <h6 >Rs. 1500.00</h6>
              </div>
              <hr className="straight-line" />
              <div className="checkout-btn">
                <button>CHECKOUT</button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Cart;
