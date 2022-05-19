import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import MovieCard from "./MovieCard";
import Movies from "./movies.json";
import api from "../../../../API/Movies/movies"


const MovieGrid = () => {
    const movies = Movies;


   useEffect(()=>{

    api.getMovies

   },[])


    return (
        <>
            <Container className="movie-grid-wrapper">
                <Grid container spacing={3} className="movie-grid-flex">
                    {movies.map((movie) => (
                        <MovieCard key={movie._id} movieDetails={movie}/>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default MovieGrid;