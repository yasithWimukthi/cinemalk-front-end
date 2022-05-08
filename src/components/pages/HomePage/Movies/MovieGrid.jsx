import { Grid } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";
import MovieCard from "./MovieCard";
import Movies from "./movies.json";

const MovieGrid = () => {
    const movies = Movies;

    return (
        <>
            <Container className="movie-grid-wrapper">
                <Grid container spacing={3} className="movie-grid-flex">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movieDetails={movie}/>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default MovieGrid;