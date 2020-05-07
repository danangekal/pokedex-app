import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import { Grid } from 'antd-mobile'

import Layout from '../components/layout'

const baseUrlInternal = process.env.BASE_API_URL_INTERNAL
const baseUrlInternalApi = `${baseUrlInternal}/api/v1`

function Home({ data }) {
  const router = useRouter()
  
  const handleClick = ({ id }) => {
    router.push(`/pokemon/${id}`)
  }
  
  return (
    <Layout title="Home" description="This is home pokedex app">
     <Grid data={data} columnNum={3} hasLine={false} onClick={handleClick} />
    </Layout>
  )
}

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`${baseUrlInternalApi}/pokemon`)
  const data = await res.json()
  
  // Pass data to the page via props
  return { props: { data } }
}

export default Home