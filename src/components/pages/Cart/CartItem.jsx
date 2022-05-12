import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";

const CartItem = () => {
  return (
    <>
      <Container className="cart-item-card-wrap">
        <Card className="cart-item-card">
          <Row>
            <Col sm={3}>
              <CardMedia
                component="img"
                height="200"
                image="https://image.tmdb.org/t/p/w500/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg"
                alt="green iguana"
              />
            </Col>
            <Col sm={9} className="cart-card-right">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Movie Name - Bohemian Rhapsody
                </Typography>
                <Typography variant="body2">No of tickets: x</Typography>
                <Typography variant="body2">Theater: One Galle Face</Typography>
                <Typography variant="body2">Date: 12/02/2022</Typography>
                <button className="remove-from-cart-btn">Remove</button>
              </CardContent>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default CartItem;
