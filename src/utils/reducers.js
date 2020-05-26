function Reducer(state, action) {
  switch (action.type) {
    case "SET_POKEMONS":
      return { ...state, pokemons: action.payload, isLoading: false }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_ORIGIN":
      return { ...state, origin: action.payload }
    case "SET_FILTER":
      return { ...state, filter: action.payload }
    default: {
      return state
    }
  }
}

export default Reducer