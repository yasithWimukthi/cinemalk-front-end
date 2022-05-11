import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";

const CartItem = () => {
  return (
    <>
      <Container>
        <Card className="cart-item-card">
          <Row>
            <Col sm>
              <CardMedia
                component="img"
                height="200"
                image="https://image.tmdb.org/t/p/w500/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg"
                alt="green iguana"
              />
            </Col>
            <Col sm>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                              </Typography>
                              <button>Remove from cart</button>
              </CardContent>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default CartItem;
