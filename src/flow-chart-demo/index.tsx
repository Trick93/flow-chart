import { Layout } from 'antd'
import DetailBox from './DetailBox'
import FlowAreaBox from './FlowAreaBox'
import NodeToolBox from './NodeToolBox'

import useFlow from './model/useFlow'
import { useState } from 'react'
import { useDebounceFn } from 'ahooks'

const { Sider, Content } = Layout

function FlowChartDemo() {
  const [_, FlowStoreProvider] = useFlow
  const [width, setWidth] = useState(350) // 右侧side宽度
  const { run: setDebounceWidth } = useDebounceFn((w) => {
    setWidth(w)
  }, {wait: 10})

  // 拖拽伸缩
  const handleDragResize = () => {
    document.onmousemove = (e) => {
      if (window.innerWidth - e.clientX > 350 && window.innerWidth - e.clientX < 1440) {
        setDebounceWidth(window.innerWidth - e.clientX)
      }
    }
    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
    }
    return false
  }

  return (
    <FlowStoreProvider>
      <Layout className="h-screen overflow-hidden">
        <Sider theme="light" width={180} className="bg-[#f7f9fb] border-0 border-solid border-r border-[#e6e9ed]">
          <NodeToolBox />
        </Sider>
        <Content className="bg-[#fefcfe] relative z-10">
          <FlowAreaBox />
        </Content>
        <div onMouseDown={handleDragResize} className="group w-2 h-full bg-gray-200 cursor-col-resize hover:bg-blue-400 transition-all flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 14" width="2" height="14" fill="currentColor" className=" text-gray-500 transition -translate-y-6 group-hover:text-white">
            <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 1)"></circle>
            <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 7)"></circle>
            <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 13)"></circle>
          </svg>
        </div>
        <Sider theme="light" width={width} className="bg-[#f7f9fb] border-0 border-solid border-l border-[#e6e9ed] select-none">
          <DetailBox />
        </Sider>
      </Layout>
    </FlowStoreProvider>
  )
}

export default FlowChartDemo
