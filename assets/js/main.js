const pokemonList = document.getElementById('pokemonList')
const pokemonStatus = document.getElementById('pokemonStatus')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;
const limit = 10;
let offset = 0





function loadPokemonItens(offset, limit) {
    PokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number"><div id="pokebola"><span id="numero">${pokemon.number}</span></div></span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img id="photo" src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                    <div>
                    <ol class="abilities">
                        ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                    </ol>
                    </div>
            </li>`).join('')

        pokemonList.innerHTML += newHtml
    })
}





loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNestPage = offset + limit

    if (qtdRecordNestPage >= maxRecords) { 
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

