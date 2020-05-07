import fetch from 'node-fetch'
import { Result, Badge } from 'antd-mobile'

import Layout from '../../components/layout'
// import './index.css'

const baseUrlInternal = process.env.BASE_API_URL_INTERNALq
const baseUrlInternalApi = `${baseUrlInternal}/api/v1`

function Pokemon({ data }) {
  return (
    <Layout title="Detail Pokemon" description="This is detail pokemon">
     <Result
        img={<img src={data.sprites.front_default} alt={data.name} />}
        title={`${data.id}. ${data.name}`}
        message={`Height: ${data.height} m - Weight: ${data.weight} kg`}
      />
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const res = await fetch(`${baseUrlInternalApi}/pokemon/${params.id}`)
  const data = await res.json()
  
  // Pass data to the page via props
  return { props: { data } }
}

export default Pokemon