

const PokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    


    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const[type] = types

    pokemon.types = types
    pokemon.type = type

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

PokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

PokeApi.getPokemons =  (offset = 0, limit = 0) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(PokeApi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
}