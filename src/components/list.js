import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import InfiniteScroll from 'react-infinite-scroller'
import { Grid, WhiteSpace, ActivityIndicator, Toast } from 'antd-mobile'

import { Context } from '../utils/context'
import { setLoading, setPokemons } from '../utils/actions'

function List({ isScroll }) {
  const router = useRouter()
  const [hasMore, setHasMore] = useState(true)
  const { state, dispatch } = useContext(Context)
  const { isLoading, filter, pokemons, origin } = state
  const splitFilter = filter.split(".")
  const filterName = splitFilter[0]
  const filterValueName = splitFilter[1]
  
  function handleClick({ id }) {
    router.push(`/pokemon/${id}`)
  }
  
  async function loadData(page) {
    dispatch(setLoading(true))
    const res = await fetch(`${origin}/api/v1/pokemon?page=${page}`)
    let newData
    try {
      newData = await res.json()      
    } catch (error) {
      newData = []
    }
    const data = pokemons.concat(newData)
    dispatch(setPokemons(data))
    dispatch(setLoading(false))
  }

  function handleInfiniteOnLoad(page) {
    if (pokemons.length < 890) {
      loadData(page)
    } else {
      setHasMore(false)
      Toast.info('This is the last data', 2)
    }
  }

  return (
    <>
      {
        isLoading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10%" }}>
            <WhiteSpace size="lg" />
            <ActivityIndicator size="large" animating />
            <WhiteSpace size="lg" />
          </div>
        )
      }
      {
        isScroll && !filter? (
          <InfiniteScroll
            initialLoad={false}
            pageStart={1}
            loadMore={handleInfiniteOnLoad}
            hasMore={!isLoading && hasMore}
          >
            <Grid data={pokemons} columnNum={3} hasLine={false} onClick={handleClick} />
          </InfiniteScroll>
        ):(
          <div>
            <div style={{ fontSize: 16 }}>
              Result filter {filterName} <b>{filterValueName}</b>
              <WhiteSpace />
            </div>
            <Grid data={pokemons} columnNum={3} hasLine={false} onClick={handleClick} />
          </div>
        )
      }
    </>
  )
}

export default List