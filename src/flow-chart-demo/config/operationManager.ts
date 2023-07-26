// 操作管理类
import type { Graph } from '@antv/g6'

class OperationManager {
  graph: Graph | null
  constructor() {
    this.graph = null
  }

  init(graph: Graph | null) {
    this.graph = graph
  }

}

export default new OperationManager()
