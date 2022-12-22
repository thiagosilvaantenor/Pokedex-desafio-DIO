const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon){
  return `<li class="pokemon ${pokemon.type}">
  <span class="number">${pokemon.number}</span>
  <span class="name">${pokemon.name}</span>

  <div class="detail">
    <ol class="types">
        ${pokemon.types
          .map(type => `<li class="type ${type}" >${type}</li>`)
          .join('')}
    </ol>

  <a href="./poke-details.html" id="pokeRequestDetail">
  <img

      src=${pokemon.photo}
      alt=${pokemon.name}
    /> </a>
    
  </div>
</li>
`
}

function loadPokemonItems(offset, limit) {
  PokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHTML = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML += newHTML
  })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit

  let qtdRecordWithNexPage = offset + limit

  if (qtdRecordWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItems(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItems(offset, limit)
  }
})
