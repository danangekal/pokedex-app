import { useEffect, useContext } from 'react'
import fetch from 'node-fetch'
import absoluteUrl from 'next-absolute-url'
import { SearchBar } from 'antd-mobile'

import { Context } from '../utils/context'
import { setPokemons, setLoading } from '../utils/actions'
import Layout from '../components/layout'
import List from '../components/list'

function Search({ data, origin }) {
  const { dispatch } = useContext(Context)

  useEffect(() => {
    dispatch(setPokemons([]))
  }, [data])

  function handleChange(value) {
    if (value) {
      dispatch(setLoading())
      const regex = new RegExp(`${value}`, 'i')
      const result = data.filter((pokemon) => {
        return pokemon.name.match(regex)
      })
      dispatch(setPokemons(result))
    } else {
      dispatch(setPokemons([]))
    }
  }
  
  return (
    <Layout title="Search" description="This is search page">
      <SearchBar placeholder="Search pokemon" cancelText="Cancel" onChange={handleChange} />
      <List isScroll={false}  origin={origin} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  // Fetch data from external API
  const { origin } = absoluteUrl(req)
  const res = await fetch(`${origin}/api/v1/pokemon`)
  let data
  
  try {
    data = await res.json()
  } catch (error) {
    data = []
  }
  
  // Pass data to the page via props
  return { props: { data, origin } }
}

export default Search