import type { IEdge, INode, IG6GraphEvent, BehaviorOption, Graph, Item } from '@antv/g6'
import { socket } from '../../../socket'

interface ExtendBehaviorOption extends BehaviorOption {
  graph?: Graph
  initSocketEvent?: any
}

const sokcetBehavior: ExtendBehaviorOption = {
  getEvents() {
    this.initSocketEvent()
    return {
      'afteradditem': 'onAfterAddItem',
      'aftercreateedge': 'onAfterCreateEdge',
    }
  },

  initSocketEvent() {
    socket.on('operate', (data: any) => {
      const { type, model } = JSON.parse(data)
      if (type === 'node') {
        (this as any).graph.addItem('node', model)
      }
      if (type === 'createEdge') {
        (this as any).graph.addItem('edge', model)
      }
    })
  },

  onAfterAddItem(evt: IG6GraphEvent) {
    socket.emit('operate',  JSON.stringify({type: evt.item?.getType(), model: evt.item?.getModel()}))
  },

  onAfterCreateEdge(e: any) {
    socket.emit('operate',  JSON.stringify({type: 'createEdge', model: e.edge?.getModel()}))
  }
}

export default sokcetBehavior