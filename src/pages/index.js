import { useState } from 'react'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import InfiniteScroll from 'react-infinite-scroller'
import { Grid } from 'antd-mobile'

import Layout from '../components/layout'

const baseUrlInternal = (process.env.BASE_API_URL_INTERNAL)? process.env.BASE_API_URL_INTERNAL:''
const baseUrlInternalApi = `${baseUrlInternal}/api/v1`

function Home({ pokemons }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  let [data, setData] = useState(pokemons)
  
  const handleClick = ({ id }) => {
    router.push(`/pokemon/${id}`)
  }

  async function fetchData(page) {
    const res = await fetch(`${baseUrlInternalApi}/pokemon?page=${page}`)
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
      fetchData(page)
    }
  }
  
  return (
    <Layout title="Home" description="This is home pokedex app">
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

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`${baseUrlInternalApi}/pokemon`)
  const data = await res.json()
  
  // Pass data to the page via props
  return { props: { pokemons: data } }
}

export default Home