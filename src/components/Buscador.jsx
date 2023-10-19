    import React, { useState } from "react";

    function Buscador(props) {
    const [searchText, setSearchText] = useState("");

    const handleSearch = () => {
        props.onSearch(searchText);
    };

    const handleReset = () => {
        setSearchText("");
        props.onSearch(""); 
    };

    return (
        <div className="search-container">
        <input
            type="text"
            className="form-control"
            placeholder="Buscar películas..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
        />
        <button
            className="btn btn-success btn-filter" 
            onClick={handleSearch}
        >
            Buscar
        </button>
        <button
            className="btn btn-danger btn-filter"
            onClick={handleReset}
        >
            Limpiar
        </button>
        </div>
    );
    }

    export default Buscador;