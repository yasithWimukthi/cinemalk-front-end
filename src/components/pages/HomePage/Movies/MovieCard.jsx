import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navigation from "../../../nav_bar/nav";
import "./movies.scss";

const MovieCard = (props) => {

  return (
    <>
      <Navigation />
      <section className='movie-card-wrapper'>
        <Card sx={{ maxWidth: 350 }}>
          <CardMedia className='movie-img'
            component="img"
            alt="movie img"
            height="250"
            width="300"
            src={props.movieDetails.img_src}
          />
          <CardContent className='movie-card shadow'>
            <Typography className='movie-details' gutterBottom variant="h5" component="div">
              {props.movieDetails.name}
              <p>Released Year - {props.movieDetails.year}</p>
            </Typography>
            <CardActions>
                <Button className='book-ticket-button' size="small">BOOK TICKETS</Button>
            </CardActions>
          </CardContent>
      </Card>
      </section>
      
    </>
  );
}

export default MovieCard;

