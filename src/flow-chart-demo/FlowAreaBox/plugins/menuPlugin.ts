// 右键菜单插件配置
import G6 from '@antv/g6'
import ReactDOM from 'react-dom'
import ContextMenu from './ContextMenu'
import type { ITEM_TYPE } from '@antv/g6'
import OperationManager from '../../config/operationManager'

const menuPlugin = new G6.Menu({
  offsetX: 6,
  offsetY: 10,
  itemTypes: ['node', 'edge', 'canvas'],
  getContent(evt) {
    let type: ITEM_TYPE | "canvas" = evt?.item?.getType() ?? "canvas"
    if (evt?.target && evt.target.isCanvas && evt.target.isCanvas()) {
      type = "canvas"
    }
    const outDiv = document.createElement('div')
    ReactDOM.render(ContextMenu({ type }), outDiv)
    console.log(outDiv)
    return outDiv
  },
  handleMenuClick(target, item) {
    let menuKey = target.closest('li')?.getAttribute('data-menu-id') ?? ''
    menuKey = menuKey.substring(menuKey.lastIndexOf('-') + 1)
    // 各种操作菜单栏
    if (menuKey === '3') {
      OperationManager.graph?.removeItem(item)
    }
    if (menuKey === '6') {
      OperationManager.graph?.fitView(20)
    }
  },
})

export default menuPlugin
