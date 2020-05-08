import { useReducer } from 'react'
import { DefaultSeo } from 'next-seo'

import { ContextProvider } from '../utils/context'
import reducers from '../utils/reducers'
import seoConfig from '../constants/seo'
import initialState from '../constants/state'

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducers, initialState);
  
  return (
    <>
      <ContextProvider value={{ state, dispatch }}>
        <DefaultSeo {...seoConfig} />
        <Component {...pageProps} />
      </ContextProvider>
    </>
  )
}

export default MyApp