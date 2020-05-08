import fetch from 'node-fetch'
import absoluteUrl from 'next-absolute-url'

import Layout from '../components/layout'
import List from '../components/list'

function Home({ data, origin }) {
  return (
    <Layout title="Home" description="This is home pokedex app">
      <List pokemons={data} origin={origin} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  // Fetch data from external API
  const { origin } = absoluteUrl(req)
  const res = await fetch(`${origin}/api/v1/pokemon`)
  const data = await res.json()
  
  // Pass data to the page via props
  return { props: { data, origin } }
}

export default Home