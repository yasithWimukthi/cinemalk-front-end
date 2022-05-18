import http from "./base";




const getMovies = ()=>{
    return http.get("/");
}




const all ={
    getMovies
}

export default all;