import { commonNodes } from "../config/basic-node-config"
import { Tag } from "antd"

const NodeItem = (props: any) => {
  const { color, name, nodeType, nodeName } = props

  const nodeDragStart = (evt: any) => {
    evt.dataTransfer.setData('nodeInfo', +evt.currentTarget.dataset.nodetype)
    evt.dataTransfer.setData('nodeName', evt.currentTarget.dataset.nodename)
  }

  return (
    <>
      <div
        draggable
        className="cursor-move h-[32px] leading-[32px] text-center text-sm mb-5 mx-8 bg-[#f4f6fc] relative shadow-[1px_1px_#ddd] hover:text-[#409eff] hover:outline-dashed hover:outline-1"
        data-nodetype={nodeType}
        data-nodename={nodeName}
        onDragStart={nodeDragStart}
      >
        {name}
        <i className="absolute w-2 h-full left-0 top-0" style={{ background: color }}></i>
      </div>
    </>
  )
}

const NodeToolBox = () => {
  return (
    <div style={{ padding: '15px 0', userSelect: 'none' }}>
      <p className="text-center mb-5">
        <Tag color="blue">节点列表</Tag>
      </p>
      {commonNodes.map((item) => (
        <NodeItem
          key={item.node_type}
          color={item.borderColor}
          name={item.name}
          nodeType={item.node_type}
          nodeName={item.name}
        />
      ))}
    </div>
  )
}

export default NodeToolBox
