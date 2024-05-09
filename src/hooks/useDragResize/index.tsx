// 在某块DIV上加上手柄可拖拽缩放
import { useRef } from 'react'

/**
 * Use this hook to make a div element resizable by dragging.
 * @param props The properties of the resizable div.
 * @param props.maxWidth The maximum width of the div.
 * @param props.minWidth The minimum width of the div.
 * @param props.maxHeight The maximum height of the div.
 * @param props.minHeight The minimum height of the div.
 * @param props.direction The direction of resizing. 'vertical' by default.
 * @returns The ref of the resizable div and the drag handler component.
 */
const useDragResize = (props: {
  /** The maximum width of the div. */
  maxWidth?: number,
  /** The minimum width of the div. */
  minWidth?: number,
  /** The maximum height of the div. */
  maxHeight?: number,
  /** The minimum height of the div. */
  minHeight?: number,
  /** The direction of resizing. 'vertical' by default. */
  direction?: 'vertical' | 'horizontal',
}): {
  /** The ref of the resizable div. */
  boxRef: React.RefObject<HTMLDivElement>,
  /** The drag handler component. */
  DragHandler: React.FC,
} => {

  const { maxWidth, minWidth, minHeight, maxHeight, direction = 'vertical' } = props

  const boxRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // 拖拽伸缩
  const handleDragResize = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX

    let startWidth = boxRef.current?.offsetWidth || 0

    document.onmousemove = (e: MouseEvent) => {
      if (direction === 'vertical') {
        const newWidth = startWidth + (startX - e.clientX)
        if (newWidth > (minWidth || 1) && newWidth < (maxWidth || Number.MAX_SAFE_INTEGER)) {
          boxRef.current!.style.width = `${newWidth}px`
        }
      }
      if (direction === 'horizontal') {
        const newHeight = e.clientY
        if (newHeight > (minHeight || 1) && newHeight < (maxHeight || Number.MAX_SAFE_INTEGER)) {
          boxRef.current!.style.height = `${newHeight}px`
        }
      }
    }
    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
    }
    return false
  }
  
  const DragHandler: React.FC = () => {
    if (direction === 'vertical') {
      return (
        <div onMouseDown={handleDragResize} className={`w-2 h-full cursor-col-resize absolute group bg-gray-200 hover:bg-blue-400 transition-all flex justify-center items-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 14" width="2" height="14" fill="currentColor" className=" text-gray-500 transition -translate-y-6 group-hover:text-white">
            <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 1)"></circle>
            <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 7)"></circle>
            <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 13)"></circle>
          </svg>
        </div>
      )
    }

    if (direction === 'horizontal') {
      return (
        <div onMouseDown={handleDragResize} className={`w-full h-2 cursor-row-resize relative group bg-gray-200 hover:bg-blue-400 transition-all flex justify-center items-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 2" width="14" height="2" fill="currentColor" className=" text-gray-500 transition group-hover:text-white">
            <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 1)"></circle>
            <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 7 1)"></circle>
            <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 13 1)"></circle>
          </svg>
        </div>
      )
    }
  }

  return {
    boxRef,
    DragHandler
  }
}


export default useDragResize
