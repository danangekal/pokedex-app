import fetch from 'node-fetch'
import { Result, Tabs, WhiteSpace, Badge, WingBlank, Progress, Grid } from 'antd-mobile'

import Layout from '../../components/layout'

const baseUrlInternal = (process.env.BASE_API_URL_INTERNAL)? process.env.BASE_API_URL_INTERNAL:''
const baseUrlInternalApi = `${baseUrlInternal}/api/v1`

function Pokemon({ data }) {
  const tabs = [
    { title: <Badge text={data.types.length}>Types</Badge> },
    { title: <Badge text={data.stats.length}>Stats</Badge> },
    { title: <Badge text={data.moves.length}>Moves</Badge> },
  ];

  const movesData = data.moves.map(({ move }, index) => ({
    text: <Badge text={move.name} />
  }))

  return (
    <Layout title="Detail Pokemon" description="This is detail pokemon">
     <Result
        img={<img src={data.sprites.front_default} alt={data.name} style={{ height: 60, width: 60 }} />}
        title={`${data.id}. ${data.name}`}
        message={`Height: ${data.height} m - Weight: ${data.weight} kg`}
      />
      <WhiteSpace />
      <div>
        <Tabs 
          tabs={tabs}
          initialPage={0}
          // onChange={(tab, index) => { console.log('onChange', index, tab); }}
          // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', backgroundColor: '#fff' }}>
            {data.types.map(({ type }, index) => (
              <Badge 
                key={index} 
                text={type.name} 
                style={{
                  marginLeft: 12,
                  padding: '0 3px',
                  backgroundColor: '#fff',
                  borderRadius: 2,
                  color: '#f19736',
                  border: '1px solid #f19736',
                }} 
              />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', backgroundColor: '#fff' }}>
            {data.stats.map(({ stat, base_stat, effort }, index) => (
              <div key={index}>
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                  <p className="sub-title">{stat.name}</p>
                  <div className="show-info">
                    <div className="progress"><Progress percent={base_stat} position="normal" /></div>
                    <div aria-hidden="true">{base_stat}</div>
                  </div>
                </WingBlank>
              </div>
            ))}
          </div>
          <div style={{ height: '200px', backgroundColor: '#fff' }}>
            <Grid data={movesData} columnNum={4} />
          </div>
        </Tabs>
      </div>
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