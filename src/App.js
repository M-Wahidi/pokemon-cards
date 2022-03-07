import { useEffect, useState } from "react";
import './index.css'
import PokemonCard from "./PokemonCard";
function App() {
  const API_URL = ' https://pokeapi.co/api/v2/pokemon/?limit=151'
  const [pokemons,setPokemons] = useState([])
  const [searchInput,setSeachInput] = useState('')
  const [filterdPokemon,setFilterdPokemon] = useState([])

  useEffect(() =>{
    const getPokmeonName = async () => {
      const resp = await fetch(API_URL)
      const data = await resp.json()
      setPokemons(data.results.map(elem => elem.name))
    }
    getPokmeonName()

  },[])

  const setFilterPokemons = (e) =>{
    setSeachInput(e.target.value)
    const filteredPokeoms =  pokemons.filter(pokemon => pokemon.toLowerCase().includes(searchInput.toLocaleLowerCase()))
    setFilterdPokemon(filteredPokeoms)

  }
  return (
    <div>
     <h1 className="title">Pokemon Card</h1>
     <div className="search_pokemon">
     <input type="search" onChange ={(e) => setFilterPokemons(e)} />
     </div>
     <div className="content">
       {searchInput !== '' && filterdPokemon.map((pokemon,idx) => <PokemonCard  name={pokemon} key ={idx}  />)}
        {searchInput === ''  && pokemons.map((pokemon,idx) => <PokemonCard  name={pokemon} key ={idx} />)}
     </div>
    </div>
  );
}

export default App;
