import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";

const CartItem = (props) => {
  return (
    <>
      <Container className="cart-item-card-wrap">
        <Card className="cart-item-card">
          <Row>
            <Col sm={3}>
              <CardMedia
                component="img"
                height="200"
                image={props.bookingDetails.movieImg}
                alt={props.bookingDetails.movieName}
              />
            </Col>
            <Col sm={9} className="cart-card-right">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Movie Name - {props.bookingDetails.movieName}
                </Typography>
                <Typography variant="body2">No of tickets: { props.bookingDetails.noOfTickets}</Typography>
                <Typography variant="body2">Ticket price: { props.bookingDetails.ticketPrice}</Typography>
                <Typography variant="body2">Theater: { props.bookingDetails.theater}</Typography>
                <Typography variant="body2">Date:{ props.bookingDetails.bookingDate}</Typography>
                <Typography variant="body2">Time:{ props.bookingDetails.bookedTime}</Typography>
                <button className="remove-from-cart-btn" onClick={() => {props.handleRemove(props.bookingDetails._id)}}>Remove</button>
              </CardContent>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default CartItem;
