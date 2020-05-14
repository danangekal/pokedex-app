
import { Tabs, WhiteSpace, Badge } from 'antd-mobile'

import About from './about'
import Sprites from './sprites'
import Stats from './stats'
import Types from './types'
import Abilities from './abilities'
import Moves from './moves'

function Detail({ data }) {
  const tabs = [
    { title: <Badge dot>Stats</Badge> },
    { title: <Badge text={data.types.length}>Types</Badge> },
    { title: <Badge text={data.abilities.length}>Abilities</Badge> },
    { title: <Badge text={data.moves.length}>Moves</Badge> },
  ]

  const stats = data.stats

  const types = data.types.map(({ type }, index) => ({
    text: <Badge key={index} text={type.name} style={{ backgroundColor: "#0000ff", borderRadius: 2, color: "#fffff" }} />
  }))

  const abilities = data.abilities.map(({ ability }, index) => ({
    text: <Badge key={index}  text={ability.name} style={{ backgroundColor: "#ff0000", borderRadius: 2, color: "#ffffff" }} />
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
    <>
      <About data={data} />
      <WhiteSpace />
      <Sprites data={sprites} />
      <WhiteSpace />
      <Tabs 
        tabs={tabs}
        initialPage={0}
        // onChange={(tab, index) => { console.log('onChange', index, tab); }}
        // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        <div style={{ height: "200px", backgroundColor: "#fff" }}>
          <Stats data={stats} />
        </div>
        <div style={{ height: "200px", backgroundColor: "#fff" }}>
          <Types data={types} />
        </div>
        <div style={{ height: "200px", backgroundColor: "#fff" }}>
          <Abilities data={abilities} />
        </div>
        <div style={{ height: "200px", backgroundColor: "#fff" }}>
          <Moves data={moves} />
        </div>
      </Tabs>
    </>
  )
}

export default Detail