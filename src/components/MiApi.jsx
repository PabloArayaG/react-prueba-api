    import React, { useState, useEffect } from "react";
    import axios from "axios";
    import Card from "./Card";
    import Buscador from "./Buscador";

    function MiApi() {
    const [movies, setMovies] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");
    const [durationSorting, setDurationSorting] = useState("asc");

    const fetchData = async (category) => {
        try {
        let url;
        if (category === "popular") {
            url = "https://api.themoviedb.org/3/movie/popular?api_key=9f49340817013bdae97ddcbe1b97a795";
        } else if (category === "top_rated") {
            url = "https://api.themoviedb.org/3/movie/top_rated?api_key=9f49340817013bdae97ddcbe1b97a795";
        }
        const response = await axios.get(url);
        const moviesData = response.data.results;

        const moviesWithDurations = await Promise.all(
            moviesData.map(async (movie) => {
            const detailsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=9f49340817013bdae97ddcbe1b97a795`);
            const movieDetails = detailsResponse.data;
            return {
                ...movie, duration: movieDetails.runtime,
            };
            })
        );

        setMovies(moviesWithDurations);
        } catch (error) {
        console.error("Error fetching data: ", error);
        }
    }

    useEffect(() => {
        fetchData("popular");
    }, []);

    const handleSearch = (query) => {
        setSearchText(query);

        if (!query) {
        fetchData("popular");
        return;
        }

        const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
        );
        setMovies(filteredMovies);
    }

    const handleSort = () => {
        const sortedMovies = [...movies];
        if (sortingOrder === "asc") {
        sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
        setSortingOrder("desc");
        } else {
        sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
        setSortingOrder("asc");
        }
        setMovies(sortedMovies);
    }

    const handleSortByDuration = () => {
        const sortedMovies = [...movies];
        if (durationSorting === "asc") {
        sortedMovies.sort((a, b) => a.duration - b.duration);
        setDurationSorting("desc");
        } else {
        sortedMovies.sort((a, b) => b.duration - a.duration);
        setDurationSorting("asc");
        }
        setMovies(sortedMovies);
    }

    return (
        <div className="container my-3">
        <div className="d-flex align-items-center">
            <button className="btn-filter" onClick={handleSort}>
            Ordenar {sortingOrder === "asc" ? "A-Z" : "Z-A"}
            </button>
            <button className="btn-filter" onClick={handleSortByDuration}>
            Ordenar por Duración {durationSorting === "asc" ? "↓" : "↑"}
            </button>
        </div>
        <Buscador onSearch={handleSearch} />
        <div className="card-container">
            {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
            ))}
        </div>
        </div>
    );
    }

    export default MiApi;