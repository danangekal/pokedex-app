import { useState } from 'react'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import absoluteUrl from 'next-absolute-url'
import InfiniteScroll from 'react-infinite-scroller'
import { Grid } from 'antd-mobile'

import Layout from '../components/layout'

function Home({ pokemons, origin }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  let [data, setData] = useState(pokemons)

  function handleClick({ id }) {
    router.push(`/pokemon/${id}`)
  }
  
  async function loadData(page) {
    const res = await fetch(`${origin}/api/v1/pokemon?page=${page}`)
    const newData = await res.json()
    data = data.concat(newData)
    setData(data)
    setLoading(false)
  }

  function handleInfiniteOnLoad(page) {
    setLoading(true)
    if (data.length > 890) {
      setHasMore(false)
      setLoading(false)
    } else {
      loadData(page)
    }
  }

  return (
    <Layout title="Home" description="This is home pokedex app">
      {
        !data && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>
        )
      }
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
      >
        <Grid data={data} columnNum={3} hasLine={false} onClick={handleClick} />
      </InfiniteScroll>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  // Fetch data from external API
  const { origin } = absoluteUrl(req)
  const res = await fetch(`${origin}/api/v1/pokemon`)
  const data = await res.json()
  
  // Pass data to the page via props
  return { props: { pokemons: data, origin } }
}

export default Home