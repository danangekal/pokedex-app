function setPokemons(data) {
  return {
    type: "SET_POKEMONS",
    payload: data
  };
}

function setLoading() {
  return {
    type: "SET_LOADING"
  };
}

export { setPokemons, setLoading }
  