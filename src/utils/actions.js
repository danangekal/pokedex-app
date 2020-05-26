function setPokemons(data) {
  return {
    type: "SET_POKEMONS",
    payload: data
  }
}

function setLoading(data) {
  return {
    type: "SET_LOADING",
    payload: data
  }
}

function setOrigin(data) {
  return {
    type: "SET_ORIGIN",
    payload: data
  }
}

function setFilter(data) {
  return {
    type: "SET_FILTER",
    payload: data
  }
}

export { setPokemons, setLoading, setOrigin, setFilter }
  