import { Layout } from 'antd'
import DetailBox from './DetailBox'
import FlowAreaBox from './FlowAreaBox'
import NodeToolBox from './NodeToolBox'

const { Sider, Content } = Layout

function FlowChartDemo() {
  return (
    <Layout className="h-screen">
      <Sider theme="light" width={180} className="bg-[#f7f9fb] border-r border-[#e6e9ed]">
        <NodeToolBox />
      </Sider>
      <Content className="bg-[#fefcfe] relative z-10">
        <FlowAreaBox />
      </Content>
      <Sider theme="light" width={350} className="bg-[#f7f9fb] border-l border-[#e6e9ed]">
        <DetailBox />
      </Sider>
    </Layout>
  )
}

export default FlowChartDemo
