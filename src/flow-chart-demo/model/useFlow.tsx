// 存放画布全局 store
import { useState } from 'react'
import { createStore } from 'hox'

const useFlow = () => {
  const [currentItem, setCurrentItem] = useState<any>({targetType: 'canvas'}) // 当前选中的元素
  return {
    currentItem,
    setCurrentItem,
  }
}

export default createStore(useFlow)
