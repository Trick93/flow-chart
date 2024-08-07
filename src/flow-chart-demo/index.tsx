import { Layout } from 'antd'
import DetailBox from './DetailBox'
import FlowAreaBox from './FlowAreaBox'
import NodeToolBox from './NodeToolBox'

import useFlow from './model/useFlow'
import useDragResize from '../hooks/useDragResize'
import useSocketState from '../hooks/useSocketState'
import { useEffect } from 'react'

import { useParams } from 'react-router-dom'

const { Sider, Content } = Layout

function FlowChartDemo() {
  const [_, FlowStoreProvider] = useFlow
  const { socketState, socket } = useSocketState()
  const params = useParams()

  const { boxRef, DragHandler } = useDragResize({direction: 'vertical', maxWidth: 1400, minWidth: 350})

  useEffect(() => {
    if (socketState) {
      socket.emit('join', { id: params.flowId })
    }
    return () => {
      socket.emit('leave', { id: params.flowId })
    }
  }, [socketState])

  return (
    <FlowStoreProvider>
      <Layout className="h-screen overflow-hidden">
        <Sider theme="light" width={180} style={{ backgroundColor: '#f7f9fb' }} className="border-0 border-solid border-r border-[#e6e9ed]">
          <NodeToolBox />
        </Sider>
        <Content className="bg-[#fefcfe] relative z-10">
          <FlowAreaBox />
        </Content>
        <div ref={boxRef} style={{ backgroundColor: '#f7f9fb' }}  className="h-full border-0 border-solid border-l border-[#e6e9ed] select-none w-[350px]">
          <DragHandler />
          <DetailBox />
        </div>
      </Layout>
    </FlowStoreProvider>
  )
}

export default FlowChartDemo
