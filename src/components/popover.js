import { useState, useContext } from 'react'
import fetch from 'node-fetch'
import { Popover, Icon } from 'antd-mobile'

const Item = Popover.Item

import { Context } from '../utils/context'
import { setFilter, setLoading, setPokemons } from '../utils/actions'
import FilterType from './filter/type'
import FilterAbility from './filter/ability'

function Popovers() {
  const { state, dispatch } = useContext(Context)
  const [visible, setVisible] = useState(false)
  const [showType, setShowType] = useState(false)
  const [showAbility, setShowAbility] = useState(false)
  const { origin, filter } = state
  const splitFilter = filter.split(".")
  const filterName = splitFilter[0]
  const filterValueId = splitFilter[2]

  console.log("filter", filter)

  async function loadData(endpoint, value) {
    dispatch(setLoading(true))
    let res
    if (value) {
      res = await fetch(`${origin}/api/v1/${endpoint}/${value}`)
    } else {
      res = await fetch(`${origin}/api/v1/${endpoint}?page=1`)
    }
    let data
    try {
      data = await res.json()      
    } catch (error) {
      data = []
    }
    
    dispatch(setPokemons(data))
    dispatch(setLoading(false))
  }
  
  function onCloseAbility() {
    loadData(filterName, filterValueId)
    setShowAbility(false)
  }

  function showModalAbility() {
    setShowAbility(true)
  }
  
  function onCloseType() {
    loadData(filterName, filterValueId)
    setShowType(false)
  }

  function showModalType() {
    setShowType(true)
  }

  function onSelect({ props }) {
    const { value } = props
    setVisible(false)
    if (value === "filter_type") {
      showModalType()
    } else if (value === "filter_ability") {
      showModalAbility()
    } else {
      dispatch(setFilter(""))
      loadData("pokemon", "")
    }
  }

  function handleVisibleChange(value) {
    setVisible(value)
  }

  return (
    <>
      <Popover mask
        overlayClassName="fortest"
        overlayStyle={{ color: "currentColor" }}
        visible={visible}
        overlay={[
          (<Item key="0" value="filter_type">Filter Type</Item>),
          (<Item key="1" value="filter_ability">Filter Ability</Item>),
          (<Item key="2" value="clear_filter">Clear Filter</Item>)
        ]}
        align={{
          overflow: { adjustY: 0, adjustX: 0 },
          offset: [-10, 0],
        }}
        onVisibleChange={handleVisibleChange}
        onSelect={onSelect}
      >
        <div style={{
          height: "100%",
          padding: "0 15px",
          marginRight: "-15px",
          display: "flex",
          alignItems: "center"
        }}
        >
          <Icon type="ellipsis" />
        </div>
      </Popover>
      <FilterAbility show={showAbility} onClose={onCloseAbility} />
      <FilterType show={showType} onClose={onCloseType} />
    </>
  )
}

export default Popovers