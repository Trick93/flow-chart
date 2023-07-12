import G6 from '@antv/g6'

G6.registerNode(
  'rect-node',
  {
    // 复写setstate方法
    setState(name, value, item) {
      const group = item?.getContainer()
      const shape = group?.get('children')[0]
      if (name === 'dark') {
        // 高亮状态
        if (value) {
          // highlight 状态为 true 时候
          shape.animate(
            {
              opacity: 0.2,
            },
            {
              duration: 300,
            },
          )
        } else {
          shape.stopAnimate()
          shape.attr('opacity', 1)
        }
      }
      if (name === 'selected' || name === 'nodeSelected') {
        // 选中状态
        if (value) {
          shape.attr({
            lineWidth: 2,
            stroke: '#1890ff',
            shadowColor: '#69c0ff',
            shadowBlur: 8,
          })
        } else {
          const { lineWidth, stroke, shadowColor, shadowBlur } = item?.get('model').style
          shape.attr({
            lineWidth,
            stroke,
            shadowColor,
            shadowBlur,
          })
        }
      }
    },
  },
  'rect',
)
