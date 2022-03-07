import { useEffect, useState } from "react";
import "./index.css";
import PokemonCard from "./PokemonCard";
import { TailSpin } from "react-loader-spinner";

function App() {
  const API_URL = " https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12&count=50";
  const [pokemons, setPokemons] = useState([]);
  const [searchInput, setSeachInput] = useState("");
  const [filterdPokemon, setFilterdPokemon] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [pageCounter, setPageCounter] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPokmeonName = () => {
      setLoading(true);
      setTimeout(async () => {
        const resp = await fetch(API_URL);
        const data = await resp.json();
        setPokemons(data.results.map((elem) => elem.name));
        setNextPage(data.next);
        setLoading(false);
      }, 500);
    };
    getPokmeonName();
  }, []);

  const fetchNextPrevPokemon = (e) => {
    setSeachInput("");
    setLoading(true);
    const clickedBtn = e.target.innerHTML;
    setTimeout(async () => {
      const resp = await fetch(clickedBtn === "NEXT" ? nextPage : prevPage);
      const data = await resp.json();
      setPokemons(data.results.map((elem) => elem.name));
      setNextPage(data.next);
      setPrevPage(data.previous);
      setLoading(false);
      setPageCounter((prev) => (clickedBtn === "NEXT" ? prev + 1 : prev - 1));
    }, 500);
  };

  const setFilterPokemons = (e) => {
    setSeachInput(e.target.value);
    const filteredPokeoms = pokemons.filter((pokemon) =>
      pokemon.toLowerCase().includes(searchInput.toLocaleLowerCase())
    );
    setFilterdPokemon(filteredPokeoms);
  };

  return (
    <div>
      <h1 className='title'>Pokemon Card</h1>
      <div className='search_pokemon'>
        <input type='search' value={searchInput || ""} onChange={(e) => setFilterPokemons(e)} />
      </div>
      <div className='content'>
        {searchInput !== "" &&
          filterdPokemon.map((pokemon, idx) => <PokemonCard name={pokemon} key={idx} TailSpin={TailSpin} />)}

        {searchInput === "" && !loading && pokemons.map((pokemon, idx) => <PokemonCard name={pokemon} key={idx} />)}
      </div>

      {!loading && (
        <div className='change-page-btn'>
          {pageCounter > 1 && (
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
