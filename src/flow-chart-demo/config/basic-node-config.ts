import './rect-node'

export const commonNodes = [
  {
    node_type: 1,
    type: 'start',
    name: '开始节点',
    color: '#e6f7ff',
    borderColor: '#69c0ff',
    shapeType: 'circle',
    size: 45,
  },
  {
    node_type: 2,
    type: 'end',
    name: '结束节点',
    color: '#e6f7ff',
    borderColor: '#69c0ff',
    shapeType: 'circle',
    size: 45,
  },
  {
    node_type: 3,
    type: 'rule',
    name: '节点类型1',
    color: '#fffbe6',
    borderColor: '#faad14',
    shapeType: 'rect-node',
  },
  {
    node_type: 4,
    type: 'interface',
    name: '节点类型2',
    color: '#f6ffed',
    borderColor: '#52c41a',
    shapeType: 'rect-node',
  },
  {
    node_type: 5,
    type: 'decision',
    name: '节点类型3',
    color: '#f0f5ff',
    borderColor: '#2f54eb',
    shapeType: 'rect-node',
  },
  {
    node_type: 6,
    type: 'decision',
    name: '节点类型4',
    color: '#fff0f6',
    borderColor: '#eb2f96',
    shapeType: 'rect-node',
  },
]

// 根据配置文件格式化节点的样式
export const formatNodeStyle = (nodeType: number | string) => {
  const target = commonNodes.find((item) => item.node_type === +nodeType)
  return {
    type: target?.shapeType,
    size: target?.size,
    style: {
      fill: target?.color || '#EFF4FF',
      cursor: 'move',
      radius: 3,
      stroke: target?.borderColor || '#434343',
      lineWidth: 1,
      shadowColor: '#d9d9d9',
      shadowBlur: 10,
    },
    nodeTypeName: target?.name,
    node_type: nodeType,
  }
}
