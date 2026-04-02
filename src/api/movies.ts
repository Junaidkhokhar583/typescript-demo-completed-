import { fetchMovies } from "./fetchMovies";

const apiKey=import.meta.env.VITE_OMDB_API_KEY;
const baseUrl=import.meta.env.VITE_API_URL;

export type Movie={
    imdbId:string;
    Title:string;
    Year:string;
    Poster:string;
}

type SearchResponse={
    Search:Movie[];
    Response:"True"|"False";
    Error?:string;
}


export async function searchMovies(query:string){
    const url=`${baseUrl}?apikey=${apiKey}&s=${query}`
    const data=await fetchMovies<SearchResponse>(url);

    if(data.Response==="False"){
        throw new Error(data.Error||"Failed to fetch movies!");
    }

    return data.Search;
}