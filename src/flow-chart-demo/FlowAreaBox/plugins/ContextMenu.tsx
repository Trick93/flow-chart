import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import type { ITEM_TYPE } from '@antv/g6'
import { CopyOutlined, DragOutlined, DeleteOutlined, CompressOutlined, ReloadOutlined } from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number]

const ContextMenu = (props: {
  type: ITEM_TYPE | "canvas"
}) => {
  const { type } = props
  const objMenus: {[x: string]: MenuItem[]} = {
    'node': [
      {
        key: '1',
        label: '复制节点',
        icon: <CopyOutlined />
      },
      {
        key: '2',
        label: '移动节点',
        icon: <DragOutlined />
      },
      {
        key: '3',
        label: '删除节点',
        icon: <DeleteOutlined />
      },
    ],
    'edge': [
      {
        key: '4',
        label: '删除连线',
        icon: <DeleteOutlined />
      }
    ],
    'canvas': [
      {
        key: '5',
        label: '重新加载',
        icon: <ReloadOutlined />
      },
      {
        key: '6',
        label: '适应窗口',
        icon: <CompressOutlined />
      },
    ]
  }

  return (
    <Menu items={objMenus[type]} inlineIndent={10} style={{border: 'none'}} />
  )
}

export default ContextMenu
