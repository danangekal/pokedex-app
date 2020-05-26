import { useState, useEffect, useContext } from 'react'
import fetch from 'node-fetch'
import InfiniteScroll from 'react-infinite-scroller'
import { Modal, Grid, Badge, Toast } from 'antd-mobile'

import { Context } from '../../utils/context'
import { setFilter } from '../../utils/actions'

function Type({ show, onClose }) {
  const { state, dispatch } = useContext(Context)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [dataType, setDataType] = useState([])
  const { origin } = state

  async function loadData(page) {
    setLoading(true)
    const res = await fetch(`${origin}/api/v1/type?page=${page}`)
    let data
    try {
      data = await res.json()      
    } catch (error) {
      data = []
    }
    const newData = dataType.concat(data)
    setDataType(newData)
    setLoading(false)
  }

  useEffect(() => {
    if (origin) {
      loadData(1)
    }
  }, [origin])

  function handleInfiniteOnLoad(page) {
    if (dataType.length < 20) {
      loadData(page)
    } else {
      setHasMore(false)
      Toast.info('This is the last data', 2)
    }
  }

  function onWrapTouchStart(e) {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  function handleClick({ id, name }) {
    dispatch(setFilter(`type.${name}.${id}`))
  }

  return (
    <>
      <Modal
        popup={true}
        transparent={true}
        visible={show}
        onClose={onClose}
        animationType="slide-up"
        maskClosable={false}
        title="Filter Type"
        footer={[{ text: 'Apply', onPress: () => { onClose() } }]}
        wrapProps={{ onTouchStart: onWrapTouchStart }}
      >
        <div style={{ height: 300, overflow: 'scroll' }}>
          { (dataType && dataType.length > 0) && 
            (
              <InfiniteScroll
                initialLoad={false}
                pageStart={1}
                loadMore={handleInfiniteOnLoad}
                hasMore={!loading && hasMore}
                useWindow={false}
              >
                <Grid data={dataType} columnNum={2} hasLine={false} onClick={handleClick} itemStyle={{ height: 50, marginTop: 10, marginBottom: 10 }}
                  renderItem={(item, index) => (
                    <Badge key={index} text={item.text} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 30, minWidth: 80,margin: 15, borderRadius: 2 }} />
                  )} 
                />
              </InfiniteScroll>
            )
          }
        </div>
      </Modal>
    </>
  )
}

export default Type