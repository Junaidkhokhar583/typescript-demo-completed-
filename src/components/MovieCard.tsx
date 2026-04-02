import type { Movie } from "../api/movies";


export default function MovieCard({movie}:{movie:Movie}){
    return(

        <div className="border p-10 border-amber-500">
            <img src={movie.Poster} alt={movie.Title} width="150"/>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>

        </div>
    )
}