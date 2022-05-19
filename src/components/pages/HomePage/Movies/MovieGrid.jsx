import { Grid } from "@mui/material";
import React, {useState, useEffect} from "react";
import { Container } from "react-bootstrap";
import { getMovies } from "../../../../API/Home page/getMovieAPI";
import MovieCard from "./MovieCard";

const MovieGrid = () => {
    const [loadedMovies, setLoadedMovies] = useState([]);


    // fetch theater details from backend theater service
    const getAllMovies = () => {
        getMovies("/api/movies")
            .then((res) => {
            setLoadedMovies(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    useEffect(() => {
        getAllMovies(); //details of all Movies will be fetched when component renders for the first time
    }, []);    

    return (
        <>
            <Container className="movie-grid-wrapper">
                <Grid container spacing={3} className="movie-grid-flex">
                    {loadedMovies.map((movie) => (
                        <MovieCard key={movie._id} movieDetails={movie}/>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default MovieGrid;
