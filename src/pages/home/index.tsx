import { Row, Col, Card } from 'antd'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return <Row gutter={20}>
    {
      Array.from({length: 20}, (_, k) => (<Col key={100+k} span={8}>
        <Card title={`演示规则流 ${100+k}`} hoverable style={{margin: '15px'}} onClick={() => navigate(`/detail/${100+k}`)}>
          这是内容.......
        </Card>
      </Col>))
    }
  </Row>
}

export default Home
