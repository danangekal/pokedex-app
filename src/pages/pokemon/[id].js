import fetch from 'node-fetch'
import absoluteUrl from 'next-absolute-url'

import Layout from '../../components/layout'
import Detail from '../../components/detail'

function Pokemon({ data }) {
  return (
    <Layout title="Detail Pokemon" description="This is detail pokemon">
      <Detail data={data} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  // Fetch data from external API
  const { origin } = absoluteUrl(req)
  const res = await fetch(`${origin}/api/v1/pokemon/${params.id}`)
  const data = await res.json()
  
  // Pass data to the page via props
  return { props: { data } }
}

export default Pokemon