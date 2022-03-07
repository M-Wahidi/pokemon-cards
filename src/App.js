import { useEffect, useState } from "react";
import "./index.css";
import PokemonCard from "./PokemonCard";
import { TailSpin } from "react-loader-spinner";

function App() {
  const [pagination,setPagination] = useState(0)
  const [pokemons, setPokemons] = useState([]);
  const [searchInput, setSeachInput] = useState("");
  const [filterdPokemon, setFilterdPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = `https://pokeapi.co/api/v2/pokemon/?offset=${pagination}&limit=12&count=50`;
  useEffect(() => {
    const getPokmeonName = () => {
      setLoading(true);
      setTimeout(async () => {
        const resp = await fetch(API_URL);
        const data = await resp.json();
        setPokemons(data.results.map((elem) => elem.name));
        setLoading(false);
      }, 500);
    };
    getPokmeonName();
  }, [pagination,API_URL]);


  const fetchNextPrevPokemon = (e) => {
    setSeachInput("");
    const clickedBtn = e.target.innerHTML
    clickedBtn === 'NEXT' ? setPagination(prev => prev + 20) : setPagination(prev => prev - 20)
  };

  const searchPokemon = () => {
    const filteredPokeoms = pokemons.filter((pokemon) =>
      pokemon.toLowerCase().includes(searchInput.toLocaleLowerCase())
    );
    setFilterdPokemon(filteredPokeoms);
  };

  useEffect(() => {
    searchPokemon();
  }, [searchInput]);

  return (
    <div>
      <h1 className='title'>Pokemon Card</h1>
      <div className='search_pokemon'>
        <input
          type='search'
          value={searchInput || ""}
          onChange={(e) => {
            setSeachInput(e.target.value);
          }}
        />
      </div>
      <div className='content'>
        {searchInput !== "" &&
          filterdPokemon.map((pokemon, idx) => <PokemonCard name={pokemon} key={idx} TailSpin={TailSpin} />)}

        {searchInput === "" && !loading && pokemons.map((pokemon, idx) => <PokemonCard name={pokemon} key={idx} />)}
      </div>

      {!loading && (
        <div className='change-page-btn'>
          {pagination >= 20 && (
            <button className='btn' onClick={(e) => fetchNextPrevPokemon(e)}>
              PREV
            </button>
          )}
          <button className='btn' onClick={(e) => fetchNextPrevPokemon(e)}>
            NEXT
          </button>
        </div>
      )}
      {loading && (
        <div className='loading'>
          <TailSpin color='orangered' height={200} width={200} />
        </div>
      )}
    </div>
  );
}

export default App;
