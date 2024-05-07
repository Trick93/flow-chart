import { useEffect, useRef, useState } from 'react'
import OperationManager from '../../config/operationManager'
import { ITEM_TYPE } from '@antv/g6'

function ContextMenu() {
  const [targetType, setTargetType] = useState<ITEM_TYPE | 'canvas' | undefined>()
  const contextMenuRef = useRef<HTMLDivElement>(null)

  // 隐藏菜单
  const handleBodyClick = () => {
    if (contextMenuRef.current) contextMenuRef.current.style.visibility = 'hidden'
  }

  useEffect(() => {
    OperationManager.graph?.on('contextmenu', (evt) => {
      console.log('aaa', evt)
      evt.stopPropagation()
      evt.preventDefault()
      const { canvasX, canvasY, item, target } = evt
      if (target.isCanvas()) {
        setTargetType('canvas')
      } else {
        setTargetType(item?.getType())
      }
      if (contextMenuRef?.current) {
        contextMenuRef.current.style.top = canvasY + 5 + 'px'
        contextMenuRef.current.style.left = canvasX + 5 + 'px'
        contextMenuRef.current.style.visibility = 'visible'
      }
      
    })
    document.body.addEventListener('click', handleBodyClick)
    return (() => {
      document.body.removeEventListener('click', handleBodyClick)
    })
  }, [])

  return <div className="invisible absolute top-0 left-0 bg-black" ref={contextMenuRef}>
    { targetType === 'canvas' && '右键点击画布' }
    { targetType === 'edge' && '右键点击边' }
    { targetType === 'node' && '右键点击节点' }
  </div>
}

export default ContextMenu
