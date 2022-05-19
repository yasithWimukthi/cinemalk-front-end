import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import CardMedia from "@mui/material/CardMedia";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Navigation from "../../../nav_bar/Nav";
import MovieBooking from "./MovieBooking";
import {QRCodeSVG} from 'qrcode.react';
import "./movies.scss";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MovieCard = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [bookingDetailsModalIsOpen, setModalIsOpen] = React.useState(false);

  //this will be executed when 'bookTickets' btn of a movie card is clicked
  const handleBookTicketBtn = () => {
    setModalIsOpen(true);
  }

  //this will be executed inside MOdal component when 'Cancel' or 'OK' btn is clicked to close the modal
  const closeBookingModal = () => {
    setModalIsOpen(false);
  }

  return (
    <>
      <Navigation />
      <section className="movie-card-wrapper">
        <Card sx={{ maxWidth: 300 }}>
          <CardMedia
            className="movie-img"
            component="img"
            alt="movie img"
            height="230"
            width="310"
            src={props.movieDetails.poster}
          />
          <CardContent className="movie-card shadow">
            <Typography
              className="movie-details"
              gutterBottom
              variant="h5"
              component="div"
            >
              {props.movieDetails.title}
              <p>Released Year - {props.movieDetails.release_date}</p>
            </Typography>
            <CardActions>
              <Button
                onClick={handleBookTicketBtn}
                variant="danger"
                className="book-ticket-button"
                size="small"
              >
                BOOK TICKETS
              </Button>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Overview:</Typography>
                <Typography>{props.movieDetails.overview}</Typography>
                <QRCodeSVG value={props.movieDetails.overview} style={{marginTop:'20px'}}/>
              </CardContent>
            </Collapse>
          </CardContent>
        </Card>
      </section>
      {bookingDetailsModalIsOpen && <MovieBooking closeModal={closeBookingModal} imgSrc={props.movieDetails.poster} id={props.movieDetails.id} name={props.movieDetails.title} genres={props.movieDetails.genres} />}
    </>
  );
};

export default MovieCard;
