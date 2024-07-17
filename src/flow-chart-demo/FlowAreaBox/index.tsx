import {useRef, useEffect} from 'react'
import G6 from '@antv/g6'

import useFlow from '../model/useFlow'
import './behavior' // 引入自定义的 behaviors
import FlowChart from '../../components/FlowChart'
// import ContextMenu from './ContextMenu' // 右键菜单
import OperationManager from '../config/operationManager'

// 插件
import snaplinePlugin from './plugins/snaplinePlugin'
import minimapPlugin from './plugins/minimapPlugin'
import menuPlugin from './plugins/menuPlugin'
import toolbarPlugin from './plugins/toolbarPlugin'

import type { Graph, GraphOptions, IG6GraphEvent, Item } from '@antv/g6'

// 用户自定义配置
// 可以参考 https://g6.antv.antgroup.com/api/graph
const userConfig: Omit<GraphOptions, "container"> = {
  plugins: [new G6.Grid(), snaplinePlugin, minimapPlugin, menuPlugin, toolbarPlugin],
  enabledStack: true,
  maxStep: 20,
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
  const [useFlowStore] = useFlow

  const { setCurrentItem } = useFlowStore()
  let sourceAnchorIdx: number | undefined, targetAnchorIdx: number | undefined

  useEffect(() => {
    // 为图表添加行为
    graph.current?.addBehaviors(
      [
        'drag-add-node',
        'hover-select',
        'socket',
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
        },
        {
          type: 'brush-select',
          includeEdges: false,
          selectedState: 'nodeSelected',
        },
      ],
      'default'
    )

    // 监听创建边事件 更新连线的起终点
    graph.current?.on('aftercreateedge', (e) => {
      graph.current?.updateItem((e.edge as Item), {
        sourceAnchor: sourceAnchorIdx,
        targetAnchor: targetAnchorIdx
      })
    })

    graph.current?.on('afteradditem', (e) => {
      if (e.item && e.item.getType() === 'edge') {
        graph.current?.updateItem(e.item, {
          sourceAnchor: sourceAnchorIdx
        })
      }
    })

    // 监听点击事件 存放当前选中的元素
    graph.current?.on('click', (e) => {
      if (e.target?.isCanvas?.()) {
        setCurrentItem({targetType: 'canvas'})
      } else {
        const itemType = e.item?.getType()
        setCurrentItem({targetType: itemType, ...e.item?.getModel()})
      }
    })

    graph.current?.on('stackchange', (data) => {
      if (data.action === 'update') {
        // 为了解决创建边的时候 多了几个update步骤
        graph.current?.getUndoStack().pop()
      }
    })

    // 初始化图表管理类
    OperationManager.init(graph.current)

    return () => {
      graph.current?.removeBehaviors(['drag-add-node', 'hover-select', 'drag-node', 'create-edge'], 'default')
      graph.current?.off('aftercreateedge')
      graph.current?.off('afteradditem')
      graph.current?.off('click')
      graph.current?.off('stackchange')
    }
  }, [])

  return (
    <div className="h-full">
      <FlowChart
        graphRef={graph}
        config={userConfig}
      />
      {/* <ContextMenu /> */}
    </div>
  )
}

export default FlowAreaBox
