import React from "react";
import { Container } from "react-bootstrap";
import CartItem from "./CartItem";
import "./cart.scss";
import NavBar from "./NavBar";

const Cart = () => {
  return (
    <>
      <NavBar />
      <Container className="cart-page-wrapper">
        <h2>cart page content</h2>
        <CartItem />
        <CartItem />
        <CartItem />
      </Container>
    </>
  );
};

export default Cart;
