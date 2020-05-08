import { createContext } from 'react'

const Context = createContext()
const ContextProvider = Context.Provider
const ContextConsumer = Context.Consumer

export { Context, ContextProvider, ContextConsumer }