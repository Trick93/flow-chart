// G6自定义行为 - 节点以及边的选择高亮样式
import type { IEdge, INode, IG6GraphEvent, BehaviorOption, Graph, Item } from '@antv/g6'

interface ExtendBehaviorOption extends BehaviorOption {
  graph?: Graph
  _removeAllState?: any
}

const hoverSelectBehavior: ExtendBehaviorOption = {

  // 清除掉当前节点和边的所有状态
  _removeAllState() {
    this.graph?.setAutoPaint(false)
    this.graph?.getNodes().forEach((node: INode) => this.graph?.clearItemStates(node, ['nodeSelected']))
    this.graph?.getEdges().forEach((edge: IEdge) => this.graph?.clearItemStates(edge))
    this.graph?.paint()
    this.graph?.setAutoPaint(true)
  },

  getEvents() {
    return {
      'node:mouseenter': 'onNodeMouseenter',
      'node:mouseleave': 'onNodeMouseleave',
      'node:dragenter': 'onNodeMouseenter',
      'node:dragleave': 'onNodeMouseleave',
      'node:dragstart': 'onNodeMouseenter',
      'node:dragout': 'onNodeMouseleave',
      'node:click': 'onNodeClick',
      'edge:mouseenter': 'onEdgeMouseenter',
      'edge:mouseleave': 'onEdgeMouseleave',
      'edge:click': 'onEdgeClick',
      'canvas:click': 'onCanvasClick',
    }
  },

  onNodeMouseenter(evt: IG6GraphEvent) {
    const nodeItem = evt.item // 获取鼠标进入的节点元素对象
    // 展示四个锚点
    this.graph?.setItemState(nodeItem as Item, 'showAnchors', true)
  },

  onNodeMouseleave(evt: IG6GraphEvent) {
    const nodeItem = evt.item // 获取鼠标离开的节点元素对象
    // 取消四个锚点
    this.graph?.setItemState(nodeItem as Item, 'showAnchors', false)
  },

  onNodeClick(evt: IG6GraphEvent) {
    // 鼠标点击节点
    // 先将 节点和边 的状态重置
    this._removeAllState()
    const nodeItem = evt.item
    this.graph?.setItemState(nodeItem as Item, 'nodeSelected', true) // 设置当前节点的 actived 状态为 true
  },

  onEdgeMouseenter(evt: IG6GraphEvent) {
    const edgeItem = evt.item // 获取鼠标进入的节点元素对象
    this.graph?.setItemState(edgeItem as Item, 'edgeHover', true) // 设置当前边的 hover 状态为 true
  },

  onEdgeMouseleave(evt: IG6GraphEvent) {
    const edgeItem = evt.item // 获取鼠标离开的节点元素对象
    this.graph?.setItemState(edgeItem as Item, 'edgeHover', false) // 设置当前边的 hover 状态为 false
  },

  onEdgeClick(evt: IG6GraphEvent) {
    // 先将 节点和边 的状态重置
    this._removeAllState()
    const edgeItem = evt.item // 获取鼠标离开的边元素对象
    this.graph?.setItemState(edgeItem as Item, 'edgeSelected', true) // 设置当前边的 active 状态为 true
  },

  onCanvasClick() {
    // 先将 节点和边 的状态重置
    this._removeAllState()
  },
}

export default hoverSelectBehavior
