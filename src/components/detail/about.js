import { Result } from 'antd-mobile'

function About({ data }) {
  return (
    <Result
      img={<img src={`https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`} alt={data.name} style={{ height: "100%", width: "100%" }} />}
      title={`${data.id}. ${data.name}`}
      message={`Height: ${data.height} m - Weight: ${data.weight} kg`}
    />
  )
}

export default About