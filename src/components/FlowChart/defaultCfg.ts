// 规则流可视化图的默认G6配置
// 详情可以参考 https://g6.antv.vision/zh/docs/api/Graph
import G6 from '@antv/g6'

export const chartDefaultCfg = {
  // fitView: true, // 开启画布自适应。开启后图自动适配画布大小
  fitViewPadding: [20, 40, 50, 20], // 图适应画布时，指定四周的留白
  modes: {
    // 设置画布的交互模式
    default: ['drag-canvas', 'zoom-canvas'],
  },
  defaultNode: {
    // 设置节点的默认样式
    type: 'rect',
    anchorPoints: [
      [0.5, 0],
      [1, 0.5],
      [0.5, 1],
      [0, 0.5],
    ],
    labelCfg: {
      // 设置节点上标签的样式
      style: {
        cursor: 'move',
      },
    },
  },
  defaultEdge: {
    // 设置边的默认样式
    style: {
      stroke: '#333',
      lineWidth: 1,
      lineAppendWidth: 5,
      opacity: 0.8,
      shadowColor: '#ddd',
      shadowOffsetX: 0,
      shadowOffsetY: 2,
      shadowBlur: 3,
      endArrow: {
        path: G6.Arrow.vee(6, 6, 0),
        fill: '#333',
      },
      cursor: 'pointer',
    },
    labelCfg: {
      // 设置边上标签的样式
      style: {
        textAlign: 'center',
        cursor: 'pointer',
        background: {
          fill: '#ffffff',
          stroke: '#9EC9FF',
          padding: [3, 5, 3, 5],
          radius: 2,
        },
      },
    },
  },
}
