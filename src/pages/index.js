import { useEffect, useContext } from 'react'
import fetch from 'node-fetch'
import absoluteUrl from 'next-absolute-url'

import { Context } from '../utils/context'
import { setPokemons } from '../utils/actions'
import Layout from '../components/layout'
import List from '../components/list'

function Home({ data, origin }) {
  const { dispatch } = useContext(Context)

  useEffect(() => {
    dispatch(setPokemons(data))
  }, [data])

  return (
    <Layout title="Home" description="This is home pokedex app">
      <List isScroll={true} origin={origin} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  // Fetch data from external API
  const { origin } = absoluteUrl(req)
  const res = await fetch(`${origin}/api/v1/pokemon?page=1`)
  let data
  
  try {
    data = await res.json()
  } catch (error) {
    data = []
  }
  
  // Pass data to the page via props
  return { props: { data, origin } }
}

export default Home