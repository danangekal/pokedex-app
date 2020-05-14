function Reducer(state, action) {
  switch (action.type) {
    case "SET_POKEMONS":
      return { ...state, pokemons: action.payload, isLoading: false }
    case "SET_LOADING":
        return { ...state, isLoading: true }
    default: {
      return state
    }
  }
}

export default Reducer