import G6 from '@antv/g6'

G6.registerNode(
  'rect-node',
  {
    getAnchorPoints(cfg) {
      return cfg?.anchorPoints || [[0, 0.5], [1, 0.5], [0.5, 1], [0.5, 0]]
    },
    afterDraw(cfg, group) {
      const bbox = group?.getBBox()
      const anchorPoints = (this as any).getAnchorPoints(cfg)
      anchorPoints.forEach((anchorPos: number[], i: number) => {
        // 添加锚点
        group?.addShape('circle', {
          attrs: {
            r: 5,
            x: bbox.x + bbox.width * anchorPos[0],
            y: bbox.y + bbox.height * anchorPos[1],
            fill: '#fff',
            stroke: '#5F95FF',
          },
          name: `anchor-point`, // 锚点的名字
          anchorPointIdx: i, // 锚点的标志
          links: 0,
          visible: false,
          draggable: true
        })
      })
    },
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
      if (name === 'showAnchors') {
        const anchorPoints = item?.getContainer().findAll(ele => ele.get('name') === 'anchor-point')
        anchorPoints?.forEach(point => {
          if (value) point.show()
          else point.hide()
        })
      }
    },
  },
  'rect',
)
