import React, { useEffect, useState } from 'react'

function PokemonCard({name}) {
    const [pokemonImage,setPokemonImage] = useState('')
    useEffect(() =>{
        const abortController = new AbortController();
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`,{signal:abortController.signal})
        .then(resp => resp.json())
        .then(data => setPokemonImage(data.sprites.other.dream_world.front_default))
        .catch(err =>{
            if(err.name === 'AbortError'){
                console.log('fetch-aborted')
                return
            }
        })
        return () => abortController.abort();
    },[name])

  return (
    <div className="card">
        <h3 className='pokemon_name'>{name}</h3>
        <div className="image">
        <img src={pokemonImage} alt={pokemonImage} loading='lazy' />
        </div>
    </div>
  )
}

export default PokemonCard