import fetch from 'node-fetch'
import absoluteUrl from 'next-absolute-url'
import { Result, Tabs, WhiteSpace, Badge, WingBlank, Progress, Grid, Carousel } from 'antd-mobile'

import Layout from '../../components/layout'

function Pokemon({ data }) {
  const tabs = [
    { title: <Badge dot>Stats</Badge> },
    { title: <Badge text={data.types.length}>Types</Badge> },
    { title: <Badge text={data.abilities.length}>Abilities</Badge> },
    { title: <Badge text={data.moves.length}>Moves</Badge> },
  ];

  const types = data.types.map(({ type }, index) => ({
    text: <Badge key={index} text={type.name} style={{ backgroundColor: '#0000ff', borderRadius: 2, color: '#fffff' }} />
  }))

  const abilities = data.abilities.map(({ ability }, index) => ({
    text: <Badge key={index}  text={ability.name} style={{ backgroundColor: '#ff0000', borderRadius: 2, color: '#ffffff' }} />
  }))

  const moves = data.moves.map(({ move }, index) => ({
    text: <Badge key={index} text={move.name} style={{ borderRadius: 2 }} />
  }))

  const sprites = [
    { text: 'front_default', icon: data.sprites.front_default },
    { text: 'front_shiny', icon: data.sprites.front_shiny },
    { text: 'back_default', icon: data.sprites.back_default },
    { text: 'back_shiny', icon: data.sprites.back_shiny },
  ]

  return (
    <Layout title="Detail Pokemon" description="This is detail pokemon">
     <Result
        img={<img src={`https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`} alt={data.name} style={{ height: '100%', width: '100%' }} />}
        title={`${data.id}. ${data.name}`}
        message={`Height: ${data.height} m - Weight: ${data.weight} kg`}
      />
      <WhiteSpace />
      <Grid data={sprites} columnNum={4} />
      <WhiteSpace />
      <Tabs 
        tabs={tabs}
        initialPage={0}
        // onChange={(tab, index) => { console.log('onChange', index, tab); }}
        // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        <div style={{ height: '200px', backgroundColor: '#fff' }}>
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
          <Grid data={types} columnNum={4} hasLine={false} />
        </div>
        <div style={{ height: '200px', backgroundColor: '#fff' }}>
          <Grid data={abilities} columnNum={4} hasLine={false} />
        </div>
        <div style={{ height: '200px', backgroundColor: '#fff' }}>
          <Grid data={moves} columnNum={4} hasLine={false} />
        </div>
      </Tabs>
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