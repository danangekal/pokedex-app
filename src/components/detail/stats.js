import { WhiteSpace, WingBlank, Progress } from 'antd-mobile'

function Stats({ data }) {
  return (
    <>
      {data.map(({ stat, base_stat }, index) => (
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
    </>
  )
}

export default Stats