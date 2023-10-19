    import React, { useEffect, useState } from "react";

    function Card({ movie }) {
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        async function fetchGenre() {
        const genreUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=9f49340817013bdae97ddcbe1b97a795`;
        const response = await fetch(genreUrl);
        const data = await response.json();
        const genreNames = data.genres.map((genre) => genre.name).join(", ");
        setGenre(genreNames);
        setDuration(data.runtime); 
        }
        fetchGenre();
    }, [movie.id]);

    return (
        <div className="card">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="card-img-top" />
        <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            <p className="card-text">
            Género: {genre}
            <br />
            Duración: {duration} minutos
            </p>
        </div>
        </div>
    );
    }

    export default Card;