import { formatNodeStyle } from '../../config/basic-node-config'

// G6自定义行为 - 拖拉增加节点
const dragAddNodeBehavior = {
  getEvents() {
    return {
      'canvas:drop': 'onCanvasDrop'
    }
  },

  onCanvasDrop(evt: any) {
    evt.preventDefault()
    if (!evt?.originalEvent?.dataTransfer?.getData('nodeInfo')) {
      return
    }
    const addNodeType = evt.originalEvent.dataTransfer.getData('nodeInfo')
    const addNodeName = evt.originalEvent.dataTransfer.getData('nodeName')
    const nodeId = 'temp' + String(Math.random() * Math.random() * 1000)
    const addNodeModel = {
      x: evt.x,
      y: evt.y,
      id: nodeId,
      label: addNodeName,
      ...formatNodeStyle(addNodeType),
    }
    const newNode = (this as any).graph.addItem('node', addNodeModel)
    // const group = newNode
    //   .get('group')
    //   .addGroup({ id: 'group-' + nodeId, name: 'unsaveNodeFlag' })
    // group.addShape('circle', {
    //   attrs: { x: 25, y: -19, r: 5, fill: '#ff4d4f' },
    // })
  },
}

export default dragAddNodeBehavior
