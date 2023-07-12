import G6 from '@antv/g6'
import { useRef } from 'react'
import { chartDefaultCfg } from './defaultCfg'
import { useDebounceFn, useMount } from 'ahooks'

interface NodeItem {
  id: string,
  label: string,
  x: number,
  y: number,
  [key:string]: any
}

interface EdgeItem {
  id: string,
  label: string,
  source: number,
  target: number,
  [key:string]: any
}

interface FlowChartProps {
  graphRef: {current: any},
  data?: {nodes: NodeItem[], edges: EdgeItem[]},
  config: any
}

const RuleFlowChart = (props: FlowChartProps) => {
  const { graphRef, data, config } = props

  const flowRef = useRef<HTMLDivElement>(null)

  const { run: handleResize } = useDebounceFn(
    (h, w) => {
      graphRef.current.changeSize(w, h)
    },
    { wait: 200 }
  )

  useMount(() => {
    if (!graphRef.current && flowRef.current) {
      const { height, width } = flowRef.current.getBoundingClientRect()

      graphRef.current = new G6.Graph({
        container: flowRef.current, // 容器元素
        width: width, // 宽度
        height: height, // 高度
        ...chartDefaultCfg, // 合并默认选项
        ...config, // 合并用户传进来的配置选项
      })

      graphRef.current.data(data ?? []) // 传入数据

      graphRef.current.render() // 渲染

      // 容器元素宽度变化
      const graphResizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0]
        const { height, width } = entry.contentRect
        // graphRef.current.changeSize(width, height)
        handleResize(height, width)
      })
      // 观察容器元素
      graphResizeObserver.observe(flowRef.current)
    }
  })

  return <div className="h-full" ref={flowRef}></div>
}

export default RuleFlowChart
