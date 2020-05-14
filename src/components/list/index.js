import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import InfiniteScroll from 'react-infinite-scroller'
import { Grid, WhiteSpace, ActivityIndicator, Icon, Toast, WingBlank } from 'antd-mobile'

import { Context } from '../../utils/context'
import { setLoading, setPokemons } from '../../utils/actions'

function List({ isScroll, origin }) {
  const router = useRouter()
  const [hasMore, setHasMore] = useState(true)
  const { state, dispatch } = useContext(Context)
  const { isLoading, pokemons } = state
  
  function handleClick({ id }) {
    router.push(`/pokemon/${id}`)
  }
  
  async function loadData(page) {
    const res = await fetch(`${origin}/api/v1/pokemon?page=${page}`)
    const newData = await res.json()
    const data = pokemons.concat(newData)
    dispatch(setPokemons(data))
    setLoading(false)
  }

  function handleInfiniteOnLoad(page) {
    if (pokemons.length > 890) {
      setHasMore(false)
      Toast.info('This is the last data', 30)
    } else {
      dispatch(setLoading())
      loadData(page)
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
        isScroll? (
          <InfiniteScroll
            initialLoad={false}
            pageStart={1}
            loadMore={handleInfiniteOnLoad}
            hasMore={!isLoading && hasMore}
          >
            <Grid data={pokemons} columnNum={3} hasLine={false} onClick={handleClick} />
          </InfiniteScroll>
        ):(
          <Grid data={pokemons} columnNum={3} hasLine={false} onClick={handleClick} />
        )
      }
    </>
  )
}

export default List