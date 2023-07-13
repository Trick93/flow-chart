import {useRef, useEffect} from 'react'
import G6 from '@antv/g6'

import './behavior' // 引入自定义的 behaviors
import FlowChart from '../../components/FlowChart'


import type { Graph, GraphOptions, IG6GraphEvent } from '@antv/g6'

// 用户自定义配置
// 可以参考 https://g6.antv.antgroup.com/api/graph
const userConfig: Omit<GraphOptions, "container"> = {
  plugins: [new G6.Grid()],
  nodeStateStyles: {
    selected: {
      lineWidth: 2,
      stroke: '#1890ff',
      shadowColor: '#69c0ff',
      shadowBlur: 8,
    },
    nodeSelected: {
      lineWidth: 2,
      stroke: '#1890ff',
      shadowColor: '#69c0ff',
      shadowBlur: 8,
    },
    dark: {
      opacity: 0.2,
    },
  },
  edgeStateStyles: {
    // 鼠标 hover 边
    edgeHover: {
      lineWidth: 1,
      stroke: '#1890ff',
      shadowColor: '#69c0ff',
      shadowBlur: 8,
    },
    edgeSelected: {
      lineWidth: 2,
      stroke: '#1890ff',
      shadowColor: '#69c0ff',
      shadowBlur: 8,
    },
    dark: {
      opacity: 0.2,
    },
  },
}

function FlowAreaBox() {
  const graph = useRef<Graph>(null) // ref 利用ref存放当前图表实例 

  useEffect(() => {
    // 为图表添加行为
    graph.current?.addBehaviors(
      [
        'drag-add-node',
        'hover-select',
        {
          type: 'drag-node',
          enableDelegate: false,
          selectedState: 'nodeSelected',
          shouldBegin: (e: IG6GraphEvent) => {
            return !['anchor', 'banAnchor'].some(
              (item) => item === e.target.get('className')
            )
          },
        },
      ],
      'default'
    )

    return () => {
      graph.current?.removeBehaviors(['drag-add-node', 'drag-node'], 'default')
    }
  }, [])

  return (
    <div className="h-full">
      <FlowChart
        graphRef={graph}
        config={userConfig}
      />
    </div>
  )
}

export default FlowAreaBox
