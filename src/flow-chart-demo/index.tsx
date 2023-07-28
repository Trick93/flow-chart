import { Layout } from 'antd'
import DetailBox from './DetailBox'
import FlowAreaBox from './FlowAreaBox'
import NodeToolBox from './NodeToolBox'

import useFlow from './model/useFlow'

const { Sider, Content } = Layout

function FlowChartDemo() {
  const [_, FlowStoreProvider] = useFlow
  return (
    <FlowStoreProvider>
      <Layout className="h-screen">
        <Sider theme="light" width={180} className="bg-[#f7f9fb] border-0 border-solid border-r border-[#e6e9ed]">
          <NodeToolBox />
        </Sider>
        <Content className="bg-[#fefcfe] relative z-10">
          <FlowAreaBox />
        </Content>
        <Sider theme="light" width={350} className="bg-[#f7f9fb] border-0 border-solid border-l border-[#e6e9ed]">
          <DetailBox />
        </Sider>
      </Layout>
    </FlowStoreProvider>
  )
}

export default FlowChartDemo
