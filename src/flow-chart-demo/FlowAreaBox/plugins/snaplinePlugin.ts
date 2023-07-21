// 辅助对齐线插件
import G6 from '@antv/g6'

const snaplinePlugin = new G6.SnapLine({
  line: {
    stroke: '#40a9ff',
    lineWidth: 2,
    lineDash: [4],
  },
  itemAlignType: true,
})

export default snaplinePlugin
