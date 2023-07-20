import {useRef, useEffect} from 'react'
import G6 from '@antv/g6'

import './behavior' // 引入自定义的 behaviors
import FlowChart from '../../components/FlowChart'


import type { Graph, GraphOptions, IG6GraphEvent, Item } from '@antv/g6'

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

  let sourceAnchorIdx: number | undefined, targetAnchorIdx: number | undefined;

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
            // 事件触发在锚点上 不触发拖拽
            return !(e.target.get('name') === 'anchor-point')
          },
        },
        {
          type: 'create-edge',
          trigger: 'drag',
          shouldBegin: (e: IG6GraphEvent) => {
            if (e.target.get('name') !== 'anchor-point') return false
            sourceAnchorIdx = e.target.get('anchorPointIdx')
            e.target.set('links', e.target.get('links') + 1)
            return true
          },
          shouldEnd: (e: IG6GraphEvent) => {
            if (e?.target?.get('name') !== 'anchor-point') return false
            if (e.target) {
              targetAnchorIdx = e.target.get('anchorPointIdx')
              e.target.set('links', e.target.get('links') + 1)
              return true
            }
            targetAnchorIdx = undefined
            return true
          }
        }
      ],
      'default'
    )

    // 监听创建边事件 更新连线的起终点
    graph.current?.on('aftercreateedge', (e) => {
      console.log('aftercreateedge', e)
      graph.current?.updateItem((e.edge as Item), {
        sourceAnchor: sourceAnchorIdx,
        targetAnchor: targetAnchorIdx
      })
    })

    graph.current?.on('afteradditem', (e) => {
      console.log('afteradditem', e)
      if (e.item && e.item.getType() === 'edge') {
        graph.current?.updateItem(e.item, {
          sourceAnchor: sourceAnchorIdx
        })
      }
    })

    // 取消创建连线 需要将锚点的 links 重置下
    graph.current?.on('afterremoveitem', (e: any) => {
      if (e.item && e.item.source && e.item.target) {
        const sourceNode = graph.current?.findById(e.item.source);
        const targetNode = graph.current?.findById(e.item.target);
        const { sourceAnchor, targetAnchor } = e.item;
        if (sourceNode && !isNaN(sourceAnchor)) {
          const sourceAnchorShape = sourceNode.getContainer().find(ele => (ele.get('name') === 'anchor-point' && ele.get('anchorPointIdx') === sourceAnchor));
          sourceAnchorShape.set('links', sourceAnchorShape.get('links') - 1);
        }
        if (targetNode && !isNaN(targetAnchor)) {
          const targetAnchorShape = targetNode.getContainer().find(ele => (ele.get('name') === 'anchor-point' && ele.get('anchorPointIdx') === targetAnchor));
          targetAnchorShape.set('links', targetAnchorShape.get('links') - 1);
        }
      }
    })

    return () => {
      graph.current?.removeBehaviors(['drag-add-node', 'hover-select', 'drag-node', 'create-edge'], 'default')
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
