import { useEffect, useState } from 'react'
import useFlow from '../model/useFlow'
import { WithNodeDetailForm, NodeType1, NodeType2, NodeType3 } from './NodeDetail'

const PanelNodeDetail = ({detail}: {detail: any}) => {

  // 存放节点相对应要渲染的组件
  const _NODE_DICT: any = {
    3: NodeType1,
    4: NodeType2,
    5: NodeType3
  }

  const { nodeType } = detail

  const Empty = () => <></>

  return WithNodeDetailForm(_NODE_DICT[nodeType] ?? Empty, detail)
}

const PanelEdgeDetail = () => {
  return '这是连线的详情信息'
}

const PanelFlowDetail = () => {
  return '这是面板详情信息'
}

function DetailBox() {
  const [useFlowStore] = useFlow
  const [type, setType] = useState('canvas') // 判断当前鼠标点击的是 线、节点、或者是图表空白处
  const [detail, setDetail] = useState<any>() // 详情信息

  const { currentItem } = useFlowStore()

  useEffect(() => {
    const { targetType = 'canvas', ...detail }: any = currentItem
    setType(targetType)
    setDetail(detail)
  }, [currentItem])

  return <section>
    { type === 'canvas' && <PanelFlowDetail /> }
    { type === 'node' && <PanelNodeDetail detail={detail} /> }
    { type === 'edge' && <PanelEdgeDetail /> }
  </section>
}

export default DetailBox
