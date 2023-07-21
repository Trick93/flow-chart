// 辅助对齐线插件
import G6 from '@antv/g6'

const minimapPlugin = new G6.Minimap({
  size: [150, 100],
  className: 'absolute right-0 bottom-0 border border-[#e2e2e2]'
})

export default minimapPlugin
