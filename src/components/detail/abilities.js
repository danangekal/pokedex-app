import { Grid } from 'antd-mobile'

function Abilities({ data }) {
  return (
    <Grid data={data} columnNum={4} hasLine={false} />
  )
}

export default Abilities