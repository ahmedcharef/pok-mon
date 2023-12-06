import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ITEMS_PER_PAGE = 20;

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(searchTerm, "eachtezrm");
    const fetch = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
          params: {
            offset: (currentPage - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
          },
        });
        console.log(searchTerm, response.data.results.length);
        setPokemonData(response.data.results);
        setTotalPages(Math.ceil(response.data.count / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch();
  }, [currentPage, searchTerm]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch = () => {
    const filteredData = pokemonData.filter((pokemon) =>
      pokemon.name.includes(searchTerm.toLowerCase())
    );
    setPokemonData(filteredData);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <center>
        <h1>Pokémon list</h1>
      </center>
      <div className="d-flex justify-content-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-primary me-2"
        >
          Previous
        </button>
        <span className="h5">{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-primary ms-2"
        >
          Next
        </button>
      </div>
      <div className="container">
        <div className="mb-3 row">
          <div className="col-9">
            <input
              type="text"
              className="form-control"
              placeholder="Search Pokémon"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-3">
            <button className="btn btn-primary w-100" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {pokemonData.map((pokemon) => (
            <div key={pokemon.name} className="col">
              <div className="card">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemon.url.split("/")[6]
                  }.png`}
                  alt={pokemon.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{pokemon.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
